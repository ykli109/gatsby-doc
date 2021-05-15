const path = require('path');

module.exports = {
    // assetPrefix: `https://bce.bdstatic.com/`,
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'docs',
                path: path.join(__dirname, 'docs')
            }
        },
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-plugin-less',
            options: {
                cssLoaderOptions: {
                    exportLocalsConvention: 'camelCase'
                }
            }
        }
    ]
}
