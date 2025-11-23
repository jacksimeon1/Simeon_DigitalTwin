#!/usr/bin/env node

/**
 * Quick setup script to generate NEXTAUTH_SECRET
 * Usage: node setup-auth.js
 */

const crypto = require('crypto');

console.log('\n🔐 NextAuth Setup Helper\n');
console.log('=' .repeat(50));

// Generate NEXTAUTH_SECRET
const secret = crypto.randomBytes(32).toString('hex');
console.log('\n1. Generated NEXTAUTH_SECRET:');
console.log(`   ${secret}\n`);

console.log('2. Get Google OAuth Credentials:');
console.log('   - Go to: https://console.cloud.google.com/');
console.log('   - Create OAuth 2.0 credentials (Web application)');
console.log('   - Add redirect URI: http://localhost:3000/api/auth/callback/google');
console.log('   - Copy Client ID and Client Secret\n');

console.log('3. Update .env.local with:');
console.log(`   GOOGLE_ID=your_client_id`);
console.log(`   GOOGLE_SECRET=your_client_secret`);
console.log(`   NEXTAUTH_SECRET=${secret}`);
console.log(`   NEXTAUTH_URL=http://localhost:3000\n`);

console.log('4. Restart dev server:');
console.log('   npm run dev\n');

console.log('=' .repeat(50));
console.log('\n✅ Setup complete! Follow the steps above.\n');
