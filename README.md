# ArtVine

[![License Badge](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ArtVine is a platform designed to connect artists with art enthusiasts. It enables artists to showcase their portfolios, sell their artwork, and build a following. Buyers can browse collections, save to their own library, and purchase directly through the platform, fostering a community that supports creative talent.

## Description
ArtVine bridges the gap between artists and buyers by providing an intuitive platform for:
- Showcasing and managing artist portfolios.
- Buying and selling artwork securely.
- Engaging with a community of art enthusiasts through social features like comments, likes, and follows.  
The platform is designed with scalability in mind and provides an optimized user experience on both desktop and mobile devices.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions?](#questions)

## Features
1. Artist Portfolios
- Upload and manage artwork galleries.
- Add descriptions and tags to pieces for better discoverability.
2. Art Marketplace
- Secure transactions for purchasing artwork.
- Wishlist feature for saving favorite pieces.
3. Social Features
- Follow favorite artists and receive updates.
- Comment and like artworks to engage with the community.
4. Admin Dashboard
- Verify artist profiles.
- Monitor and manage flagged content.
5. Responsive Design
- Mobile-friendly and accessible UI for all users.

## Technologies Used
- Front-End: React, Apollo Client
- Back-End: Node.js, Express.js, GraphQL, MongoDB (with Mongoose ODM)
- Authentication: JSON Web Tokens (JWT)
- Deployment: Render
- Other Tools: GitHub Actions for CI/CD

## Installation
To install the required dependencies, run the following command in your terminal:

```bash
npm install
```

Set up environment variables in a .env file in the server directory:

```bash
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
```

## Usage
After installation, run the development servers:

```bash
npm run start:dev
```

Or check out the [deployed application]() on Render.

- Artists can create accounts, upload artwork, and manage their portfolios.
- Buyers can browse artwork, follow artists, and make purchases.

## Contributing
[cgroth06](https://github.com/cgroth06)
[DimintriLo](https://github.com/DimintriLo)
[modifiedyoke](https://github.com/modifiedyoke)
[yahye-mohamed101](https://github.com/yahye-mohamed101)

Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License
This project is licensed under the MIT License.  
For more details, visit the [MIT License page](https://opensource.org/licenses/MIT).

## Tests
This section will include details of the tests we plan to implement in future iterations of this project.

## Questions?
Find me on GitHub: [EthanForrestCarr](https://github.com/EthanForrestCarr)  
For any additional questions: ethan@ethancarr.com