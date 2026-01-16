# 🔥 MemeCord - The Ultimate Meme Generator API

<div align="center">

![MemeCord Banner](https://img.shields.io/badge/MemeCord-Node.js%20Meme%20Generator-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-green?style=for-the-badge)
![Templates](https://img.shields.io/badge/Templates-80+-orange?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-yellow?style=for-the-badge)

**Generate memes programmatically with 80+ built-in templates**

</div>

## ✨ Features

- **🎭 80+ Meme Templates** - From classic formats to modern trends
- **🚀 Blazing Fast** - Built on Node.js Canvas for high performance
- **📦 Zero Dependencies** (except canvas) - Lightweight and easy to use
- **🔧 TypeScript Support** - Full TypeScript definitions included
- **🌐 URL & Local Images** - Supports both remote URLs and local files
- **🎨 Advanced Text Handling** - Automatic wrapping, sizing, and formatting
- **🖼️ Image Manipulation** - Overlays, filters, and effects
- **📱 Easy Integration** - Works with Discord bots, web apps, and more

## 🚀 Quick Start

### Installation

```bash
npm install memecord
# or
yarn add memecord
```

# Basic Usage

```javascript
const Meme = require('memecord');
const meme = new Meme();
const fs = require('fs').promises;

async function createMeme() {
    // Generate a classic "Change My Mind" meme
    const buffer = await meme.changemymind("JavaScript is the best language");
    
    // Save it
    await fs.writeFile('output.jpg', buffer);
    console.log('Meme created! 🎉');
}

createMeme();
```

# 📚 Documentation

Available Methods

Text Memes (30+ templates)

· changemymind(text) - Steven Crowder "Change My Mind" meme
· brain(text1, text2, text3, text4) - Expanding brain meme
· emergencymeeting(text) - Among Us emergency meeting
· drake(text1, text2) - Drake hotline bling format
· walking(text) - "Me walking into" meme
· And many more...

Image Overlay Memes (25+ templates)

· bed(avatar1, avatar2) - Two avatars in bed
· slap(avatar1, avatar2) - Slap meme with two avatars
· wanted(avatar) - Wanted poster with avatar
· jail(avatar) - Avatar behind bars
· trash(avatar) - Avatar in trash can
· And many more...

Mixed Memes (15+ templates)

· byemom(avatar, username, text) - "Bye mom" heading out meme
· tweet(avatar, username, text, handle?) - Realistic Twitter tweet
· youtube(avatar, username, text) - YouTube comment format
· quote(avatar, username, text) - Inspirational quote format

Special Formats (10+ templates)

· invert(avatar) - Invert colors of an image
· gay(avatar) - Add pride flag overlay
· america(avatar) - Add American flag overlay
· yomomma() - Returns random Yo Mama joke (text only)

# Advanced Features

Custom Fonts

```javascript
const meme = new Meme({
    fontPath: './fonts/custom-font.ttf',
    defaultFont: 'CustomFont'
});
```

Image Quality Control

```javascript
// Generate high-quality meme
const buffer = await meme.changemymind("Text", {
    quality: 1.0,      // 0.0 to 1.0
    format: 'jpeg',    // 'jpeg' or 'png'
    compression: 9     // PNG compression level
});
```

# Batch Processing

```javascript
// Generate multiple memes at once
const memes = [
    { method: 'changemymind', args: ['Text 1'] },
    { method: 'drake', args: ['Option 1', 'Option 2'] },
    { method: 'tweet', args: ['avatar.jpg', 'User', 'Tweet text'] }
];

for (const memeConfig of memes) {
    const buffer = await meme[memeConfig.method](...memeConfig.args);
    // Process each meme...
}
```

# 🎯 Examples

Discord Bot Integration

```javascript
const Discord = require('discord.js');
const client = new Discord.Client();
const Meme = require('memecord');
const meme = new Meme();

client.on('message', async message => {
    if (message.content.startsWith('!meme')) {
        const args = message.content.split(' ').slice(1);
        
        if (args[0] === 'changemymind') {
            const text = args.slice(1).join(' ');
            const buffer = await meme.changemymind(text);
            message.channel.send({ files: [{ attachment: buffer, name: 'meme.jpg' }] });
        }
    }
});
```

# Express.js API Server

```javascript
const express = require('express');
const Meme = require('memecord');
const meme = new Meme();

const app = express();

app.get('/meme/changemymind', async (req, res) => {
    const text = req.query.text || 'Change My Mind';
    const buffer = await meme.changemymind(text);
    res.set('Content-Type', 'image/jpeg');
    res.send(buffer);
});

app.listen(3000, () => console.log('Meme API running on port 3000'));
```

# Real-World Usage Examples

```javascript
// 1. Create a tweet-style announcement
const tweetBuffer = await meme.tweet(
    'company-logo.jpg',
    'TechCorp',
    'Announcing our new AI-powered meme generator API! 🚀',
    'TechCorpAI'
);

// 2. Generate a motivational quote for your team
const quoteBuffer = await meme.quote(
    'ceo-avatar.jpg',
    'Jane CEO',
    'The only way to do great work is to love what you do.'
);

// 3. Create fun team memes
const teamBuffer = await meme.bed('employee1.jpg', 'employee2.jpg');

// 4. Generate social media content
const contentBuffer = await meme.expandingwwe(
    'Write code',
    'Write good code',
    'Write documented code',
    'Write tested code',
    'Actually run the tests'
);
```


# 🛠️ Development

Prerequisites

· Node.js 14+
· npm or yarn
· Canvas dependencies (system-specific)

# Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/yourusername/memecord.git
cd memecord

# Install dependencies
npm install

# Install canvas dependencies (Ubuntu/Debian)
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# Install canvas dependencies (macOS)
brew install pkg-config cairo pango libpng jpeg giflib librsvg

# Run tests
npm test

# Build for production
npm run build
```

Adding New Templates

1. Create a new method in the appropriate category folder
2. Add the template image to assets/
3. Implement the meme generation logic
4. Add TypeScript definitions
5. Write tests for the new template
6. Update documentation

Example template structure:

```javascript
// src/templates/text/awesomeMeme.js
module.exports = async function awesomeMeme(text, options = {}) {
    // Load template image
    // Apply text with proper formatting
    // Return image buffer
};
```

# 🤝 Contributing

We love contributions! Here's how you can help:

Ways to Contribute

1. Add new meme templates - Missing your favorite meme? Add it!
2. Improve documentation - Help make our docs even better
3. Fix bugs - Found an issue? Submit a fix
4. Suggest features - Have ideas for new features?
5. Write tests - Help improve test coverage

Contribution Process

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

Code Guidelines

· Follow existing code style and patterns
· Add tests for new functionality
· Update documentation for API changes
· Ensure all tests pass before submitting

📊 Performance

MemeCord is optimized for performance:

· Memory efficient: Stream-based processing
· Fast generation: Average < 200ms per meme
· Caching: Template images cached in memory
· Parallel processing: Support for batch operations

🔒 Security

· Input validation: All inputs are validated and sanitized
· Safe image processing: Protection against malicious images
· Resource limits: Memory and timeout limits enforced
· No external calls: All processing is local (except URL image loading)


# 🌐 Browser Support

While primarily a Node.js library, MemeCord can be adapted for browser use:

· Use with browserify or webpack
· Requires canvas polyfill for browsers
· Limited to simpler templates in browser environment

📖 API Reference

Meme Class

```javascript
const meme = new Meme(options);
```

Options:

· fontPath: Path to custom font file
· defaultFont: Default font family name
· cacheTemplates: Whether to cache template images (default: true)
· maxImageSize: Maximum image size in bytes (default: 10MB)

Common Methods

Text Memes

```javascript
// Change My Mind
buffer = await meme.changemymind(text, options);

// Drake Meme
buffer = await meme.drake(option1, option2, options);

// Expanding Brain
buffer = await meme.brain(panel1, panel2, panel3, panel4, options);
```

Image Memes

```javascript
// Avatar overlay memes
buffer = await meme.bed(avatar1, avatar2, options);
buffer = await meme.slap(avatar1, avatar2, options);
buffer = await meme.wanted(avatar, options);
```

Mixed Memes

```javascript
// Social media formats
buffer = await meme.tweet(avatar, username, text, handle, options);
buffer = await meme.youtube(avatar, username, text, options);
buffer = await meme.quote(avatar, username, text, options);
```

Error Handling

```javascript
try {
    const buffer = await meme.changemymind(text);
} catch (error) {
    if (error.name === 'ValidationError') {
        console.error('Invalid input:', error.message);
    } else if (error.name === 'ImageError') {
        console.error('Image processing failed:', error.message);
    } else {
        console.error('Unknown error:', error);
    }
}
```

❓ Frequently Asked Questions

Q: Can I use custom images as templates?

A: Yes! You can extend the library to add custom templates or modify existing ones.

Q: Is this library suitable for production?

A: Absolutely! MemeCord is battle-tested and used in production by multiple applications.

Q: How do I handle large volumes of memes?

A: Use batch processing and consider implementing a queue system for high-volume applications.

Q: Can I contribute templates from different languages/cultures?

A: Yes! We welcome templates from all cultures and languages. Please ensure proper attribution.

Q: What's the maximum text length?

A: It varies by template, but most support up to 500 characters with automatic wrapping.

📄 License

MIT License - see LICENSE file for details.

🙏 Acknowledgments

· Canvas community for the amazing image processing library
· All meme creators for the endless inspiration
· Contributors who help make this project better
· You for using MemeCord! ❤️

📞 Support

· Issues: GitHub Issues
· Discord: Join our community

🌟 Show Your Support

If you find MemeCord useful, please consider:

· Giving a ⭐ on GitHub
· Sharing with your friends
· Contributing to the project
· Building something awesome with it!

---

<div align="center">

Happy Memeing! 🎭

Made with ❤️ by the MemeCord Team

</div>