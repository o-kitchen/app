> [!WARNING]
>  The o-kitchen app is still in prototyping and early development.

# O-KITCHEN

 **[🇨🇳 中文](./README.md)  |  [🇺🇸 English](./README-EN.md)**

> Decentralized Platform for Fandoms - Ship and Preserve Your Fanworks On-Chain

[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Lens Protocol](https://img.shields.io/badge/Protocol-Lens-dark.svg)](https://lens.xyz/docs/protocol)
[![Grove Storage](https://img.shields.io/badge/Storage-Grove-orange.svg)](https://lens.xyz/docs/storage)
[![License: AGPL](https://img.shields.io/badge/License-AGPL-purple.svg)](https://opensource.org/licenses/agpl-v3)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.75-orange.svg)](https://tanstack.com/query)

## 🩵 Project Overview

**O-Kitchen** is a decentralized fandom platform that provides creators with a secure, open environment to share and preserve fan works. As an alternative to Tumblr, Pixiv, and Lofter, O-Kitchen leverages blockchain technology to ensure permanent preservation and complete ownership of creative works.

## ✨ Core Features

- **🚢 On-Chain Storage**: Permanent content storage powered by Lens Protocol
- **🎨 Creation Tools**: Rich text editor with image and text composition support
- **🌐 Decentralized**: Censorship-resistant with full creator ownership
- **👥 Social Interaction**: Follow, like, comment, and share functionality
- **🔍 Content Discovery**: Smart recommendations and tag-based categorization
- **🌍 Multilingual**: Chinese and English interface support
- **📱 Responsive Design**: Optimized mobile and desktop experience
- **🎭 Fandom Culture**: Features specifically designed for fan creation communities

## 🧱 Technical Architecture

### Tech Stack

| Layer              | Technology                              | Purpose                                 |
| ------------------ | --------------------------------------- | --------------------------------------- |
| **Frontend**       | Next.js 14.2.16 + TypeScript 5.0 + App Router | Modern React app with server-side rendering |
| **Blockchain**     | Lens Protocol + Grove Storage           | Decentralized content storage and social graph |
| **Web3 Integration** | Wagmi v2.15 + Viem v2.29 + ConnectKit | Wallet connection and blockchain interaction |
| **State Management** | Zustand 5.0 + TanStack Query v5.75    | Application state and server data management |
| **UI Components**  | TailwindCSS 3.4 + Radix UI + shadcn/ui | Component library and design system    |
| **Internationalization** | next-intl 4.3                      | Multi-language support                 |
| **Real-time Communication** | XMTP React SDK                 | messaging                |
| **Theme System**   | next-themes 0.4 + Mantine 8.2          | Dark/light theme switching             |

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ and pnpm 9.7+
- Git version control
- Web3 wallet (MetaMask, etc.)

### Installation

```bash
# Clone repository
git clone https://github.com/o-kitchen/app.git
cd o-kitchen

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to view the application.

### Environment Configuration

```bash
# Copy environment template
cp .env.example .env.local

# Configure environment variables
# .env.local
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
NEXT_PUBLIC_ALCHEMY_ID=kkkkkkkkkkkkkkkkkkkkk

NEXT_PUBLIC_ENVIRONMENT=development

NEXT_PUBLIC_APP_ADDRESS_TESTNET=0xDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD 

LENS_API_KEY_TESTNET=bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb 
```

## 📁 Project Structure

```
o-kitchen/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── [locale]/                # Internationalized routes
│   │   │   ├── feed/                # Feed page
│   │   │   ├── profile/             # User profile
│   │   │   ├── discover/            # Content discovery
│   │   │   └── p/[postid]/         # Post details
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── auth/                    # Authentication components
│   │   ├── comment/                 # Comment system
│   │   ├── dialogs/                 # Dialog components
│   │   ├── editer/                  # Rich text editor
│   │   ├── feed/                    # Feed components
│   │   ├── home/                    # Home page components
│   │   ├── providers/               # Context providers
│   │   ├── ui/                      # Reusable UI components
│   │   └── user/                    # User-related components
│   ├── contexts/                    # React contexts
│   ├── hooks/                       # Custom React hooks
│   ├── i18n/                        # Internationalization config
│   ├── lib/                         # Utility libraries and config
│   ├── stores/                      # State management
│   └── utils/                       # Utility functions
├── public/                          # Static assets
├── txt/                            # Documentation and config
├── package.json                     # Project dependencies
└── README.md
```

## 🎮 User Guide

### 1. Connect Wallet

Click the "Connect Wallet" button in the top right corner. Supports mail-login, MetaMask, WalletConnect, and other major wallets.

### 2. Create Content

- Navigate to "Create" page
- Use the rich text editor to create content
- Add images, tags, and descriptions
- Publish to on-chain storage

### 3. Discover Content

- Browse popular content on "Discover" page
- Use tags to filter content of interest
- Follow favorite creators
- Interact with content (like, comment, share)

### 4. Manage Profile

- Edit profile and avatar
- View creation history
- Manage follow list
- Configure personal preferences

## 🔧 Development Scripts

```bash
# Development
pnpm dev                          # Start development server
```
```bash
pnpm build                        # Build production version
pnpm start                        # Start production server
pnpm lint                         # Code linting

# Type checking
pnpm type-check                   # TypeScript type checking

# Code formatting
pnpm format                       # Code formatting
pnpm format:check                 # Check code format
```

## 🌐 Multilingual Support

O-Kitchen currently supports the following languages:

- 🇨🇳 Chinese Simplified
- 🇺🇸 English

Language switching is available in the language selector at the left of the page.

## 🤝 Contributing

We welcome community contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for detailed information on how to get started.

## 🛣️ Roadmap

For detailed todo items, please see [todos.md](./todos.md).

## 📄 License

This project is licensed under the AGPL-3.0 License - see the [LICENSE](./LICENSE) file for details.

## 🕊️ Support & Contact

- 📮 Mail: `rey.b.wu@gmail.com`
- 👾 Reports: [Issues](https://github.com/o-kitchen/app/issues)
- 💬 Discussion: [Discussions](https://github.com/orgs/o-kitchen/discussions)


⭐ If this project helps you, please give us a Star!

**Made with 🩵 by the O-Kitchen community**