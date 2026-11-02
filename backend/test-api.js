// Comprehensive End-to-End API Test Suite for HOMORA
const http = require('http');
const { startServer } = require('./server');

const request = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
};

async function runTests() {
  console.log('🚀 Booting Server & Starting HOMORA API Test Suite...\n');
  const server = startServer();
  // Brief pause for port listening
  await new Promise((r) => setTimeout(r, 800));

  const host = '127.0.0.1';
  const port = process.env.PORT || 5000;

  try {
    // 1. Health Check
    console.log('1. Testing GET /api/health');
    const health = await request({ host, port, path: '/api/health', method: 'GET' });
    console.log(`   Status: ${health.status}, Result:`, health.data);
    if (health.status !== 200) throw new Error('Health check failed');

    // 2. Auth Login with Demo Account
    console.log('\n2. Testing POST /api/auth/login');
    const loginRes = await request(
      {
        host,
        port,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { email: 'aarav@homora.com', password: 'Password123' }
    );
    console.log(`   Status: ${loginRes.status}, User:`, loginRes.data.user?.name);
    if (loginRes.status !== 200) throw new Error('Login failed: ' + JSON.stringify(loginRes.data));
    const token = loginRes.data.token;
    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // 3. Auth Me
    console.log('\n3. Testing GET /api/auth/me');
    const meRes = await request({
      host,
      port,
      path: '/api/auth/me',
      method: 'GET',
      headers: authHeaders,
    });
    console.log(`   Status: ${meRes.status}, Name:`, meRes.data.user?.name);

    // 4. Properties List & Filter
    console.log('\n4. Testing GET /api/properties (Filter: location=Lucknow)');
    const propsLucknow = await request({
      host,
      port,
      path: '/api/properties?location=Lucknow',
      method: 'GET',
    });
    console.log(`   Status: ${propsLucknow.status}, Lucknow Count:`, propsLucknow.data.count);
    if (propsLucknow.data.count < 1) throw new Error('Filter properties failed');

    // 5. Single Property Details
    const targetPropId = propsLucknow.data.data[0]._id;
    console.log(`\n5. Testing GET /api/properties/${targetPropId}`);
    const singleProp = await request({
      host,
      port,
      path: `/api/properties/${targetPropId}`,
      method: 'GET',
    });
    console.log(`   Status: ${singleProp.status}, Title:`, singleProp.data.data?.title);

    // 6. Wishlist Add, Get, Remove
    console.log('\n6. Testing Wishlist Operations');
    const addWishlist = await request({
      host,
      port,
      path: `/api/wishlist/${targetPropId}`,
      method: 'POST',
      headers: authHeaders,
    });
    console.log(`   Add Wishlist Status: ${addWishlist.status}, Count:`, addWishlist.data.data?.length);

    const getWishlist = await request({
      host,
      port,
      path: '/api/wishlist',
      method: 'GET',
      headers: authHeaders,
    });
    console.log(`   Get Wishlist Status: ${getWishlist.status}, Saved Items:`, getWishlist.data.count);

    const removeWishlist = await request({
      host,
      port,
      path: `/api/wishlist/${targetPropId}`,
      method: 'DELETE',
      headers: authHeaders,
    });
    console.log(`   Remove Wishlist Status: ${removeWishlist.status}`);

    // 7. Create New Property Listing
    console.log('\n7. Testing POST /api/properties (Listing Creation)');
    const createProp = await request(
      {
        host,
        port,
        path: '/api/properties',
        method: 'POST',
        headers: authHeaders,
      },
      {
        title: 'Verdant Heights Sky Villa',
        description: 'An architectural statement with panoramic horizon vistas.',
        price: 26000000,
        location: 'Shaheed Path, Gomti Nagar Extension',
        city: 'Lucknow',
        propertyType: 'Penthouse',
        bedrooms: 4,
        bathrooms: 4,
        area: 3800,
        amenities: ['Private Plunge Pool', 'Double Height Balcony', 'Covered Parking'],
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        ],
      }
    );
    console.log(`   Create Status: ${createProp.status}, Created ID:`, createProp.data.data?._id);
    const newPropId = createProp.data.data?._id;

    // 8. Update Listing
    if (newPropId) {
      console.log(`\n8. Testing PUT /api/properties/${newPropId}`);
      const updateProp = await request(
        {
          host,
          port,
          path: `/api/properties/${newPropId}`,
          method: 'PUT',
          headers: authHeaders,
        },
        {
          title: 'Verdant Heights Grand Sky Villa (Updated Edition)',
          price: 27500000,
        }
      );
      console.log(`   Update Status: ${updateProp.status}, New Title:`, updateProp.data.data?.title);
    }

    // 9. Contact Inquiry Submission
    console.log('\n9. Testing POST /api/contact');
    const contactRes = await request(
      {
        host,
        port,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        name: 'Dr. Siddharth Mehra',
        email: 'dr.siddharth@mehra-clinics.com',
        subject: 'Acquisition Inquiry for Sky Penthouse',
        message: 'Kindly arrange a physical walkthrough this upcoming Saturday.',
      }
    );
    console.log(`   Contact Status: ${contactRes.status}, Message:`, contactRes.data.message);

    console.log('\n✨ ALL HOMORA API TEST SUITES PASSED FLAWLESSLY! ✨\n');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed with error:', err);
    if (server) server.close();
    process.exit(1);
  }
}

runTests();
