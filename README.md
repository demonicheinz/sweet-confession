<div align=center>

![Banner](/assets/banner.png)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&labelColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-black?logo=typescript&labelColor=black)
![React](https://img.shields.io/badge/React-black?logo=react&labelColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-black?logo=tailwindcss&labelColor=black)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-black?logo=framer&labelColor=black)

![GitHub License](https://img.shields.io/github/license/demonicheinz/sweet-confession?logo=creative-commons&logoColor=white&label=License)
![GitHub last commit](https://img.shields.io/github/last-commit/demonicheinz/sweet-confession?logo=github&label=Last%20Commit)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/demonicheinz/sweet-confession/CodeQL.yml?branch=main&logo=github&label=Build)
[![Live Preview](https://img.shields.io/badge/Live%20Preview-🔗-blue?logo=vercel&logoColor=white)](https://sweet-confession.vercel.app//)

<h3>Sweet Confession</h3>

A beautiful and interactive way to express your feelings through a digital love letter. Open a virtual envelope to reveal a heartfelt message with elegant animations and immersive audio experience.

</div>

---

<br>

## 📃 Table of Content

- [📃 Table of Content](#📃-table-of-content)
- [✨ Features](#✨-features)
- [🚀 Tech Stack](#🚀-tech-stack)
- [📋 Prerequisite](#📋-prerequisite)
- [🔧 Installation](#🔧-installation)
- [🏗️ Building for Production](#🏗️-building-for-production)
- [📝 Usage](#📝-usage)
- [🎨 Customization](#🎨-customization)
- [🔊 Audio Features](#🔊-audio-features)
- [🤝 Contributing](#🤝-contributing)
- [📄 License](#📄-license)
- [👨‍💻 Contact](#👨‍💻-contact)

## ✨ Features

- **Interactive Envelope**: Beautiful 3D envelope with opening animation
- **Elegant Typography**: Handwritten-style text using "Dancing Script" font
- **Immersive Audio**: Background music and sound effects for a complete experience
- **Responsive Design**: Mobile-first approach that works on all devices
- **Interactive Elements**: Smooth animations and transitions
- **Easy Sharing**: Integrated WhatsApp button for quick responses

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons

## 📋 Prerequisite

Make sure you have installed:

- **Node.js** `v18` or later → [Download Node.js](https://nodejs.org/)
- **Package Manager**: 
- [`pnpm`](https://pnpm.io/) (recommended) 
- [`npm`](https://www.npmjs.com/) 
- [`yarn`](https://yarnpkg.com/) 
- [`bun`](https://bun.sh/)

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/demonicheinz/sweet-confession.git
   cd sweet-confession
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Run development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
npm run build
# or
pnpm build
# or
yarn build
# or
bun build
```

To run a production build:

```bash
npm start
# or
pnpm start
# or
yarn start
# or
bun start
```

## 📝 Usage

1. The application opens with a pink envelope containing a heart
2. Click on the envelope to open it
3. A love letter appears with an automatic typing animation
4. After the letter is complete, a signature appears at the bottom
5. A reply button becomes visible, allowing the recipient to respond via WhatsApp

## 🎨 Customization

To customize the letter content, modify the constants in `src/utils/constants.ts`:

```typescript
export const DEFAULT_MESSAGES = [
  "Dear {recipient},",
  "This is where your heartfelt message will appear.",
  "You can add as many paragraphs as you want.",
  "With love,",
  "{sender}"
];

export const CONTACT_INFO = {
  phoneNumber: "1234567890",
  replyMessage: "Hi {sender}, I've read your sweet confession!",
};
```

Replace the placeholders with your own content:
- `{recipient}`: Recipient's name
- `{sender}`: Your name (the sender)

## 🔊 Audio Features

The application includes several audio elements to enhance the experience:

- **Paper Rustle**: Plays when opening the envelope
- **Typing Sound**: Accompanies the letter typing animation
- **Signing Pen**: Plays when the signature appears
- **Background Music**: Gentle piano music for atmosphere

All sounds can be muted with a convenient sound control button.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Contact

If you have any questions or would like to contribute, feel free to reach out to me!

- Email: [contact@heinz.id](mailto:contact@heinz.id)
- GitHub: [github.com/demonicheinz](https://github.com/demonicheinz)
- Website: [heinz.id](https://example.com)

---

*Made with ❤️ for expressing feelings to someone special.*