# DALL-E 3 Image Generator

Welcome to the open-source repository for the DALL-E 3 Image Generator! This project is built on [Next.js](https://nextjs.org/) and allows you to generate images using the DALL-E 3 model by OpenAI.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version recommended)
- A package manager like npm, yarn, pnpm, or bun

Additionally, you will need an API key from OpenAI to use the DALL-E 3 model.

## Setup

To get started with this project, clone the repository and install the dependencies:

````bash
git clone https://github.com/peteracs/dall-e-3-next-js-template.git
cd dall-e-3-next-js-template
npm install
# or
yarn install

Next, create a `.env.local` file in the root of your project and add your OpenAI API key:

```env
OPENAI_API_KEY="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
````

Replace `sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your actual API key.

## Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Editing the Application

You can start editing the application by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

We welcome contributions to this project!

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

This project is not affiliated with OpenAI but uses the OpenAI API to generate images. All trademarks, service marks, trade names, trade dress, product names, and logos appearing in this project are the property of their respective owners.

---

Happy image generating! 🎨
