

module.exports = {
  siteUrl: 'http://listad.vercel.app',
  generateRobotsTxt: true,
  exclude:['dashboard/profile'],
  sitemapSize:7000,
  // optional
  robotsTxtOptions: {
    policies:[
    {userAgent:'*',
    allow:['/',
    '/details/[title]/[id]',
    '/seller/[email]','/search'],
     disallow:['dashboard/profile']
  }],
    
  },
}
