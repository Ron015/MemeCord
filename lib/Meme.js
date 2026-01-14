const {
    createCanvas, loadImage, registerFont
} = require("canvas");
const fs = require("fs")
    .promises;
const path = require("path");
const fetch = require('node-fetch');

// If you want to use custom fonts, you can register them here
// registerFont('path/to/font.ttf', { family: 'FontName' });

/**
 * Memer API Memes Generator
 * @example const Meme = require("./memer-api");
 * const memer = new Meme();
 *
 * memer.youtube("./image.png", "Memer API", "A Youtube Comment")
 *  .then(youtube => {
 *      const attachment = new Discord.MessageAttachment(youtube, "youtube.png");
 *  })
 */
class Meme {
    constructor() {
        // No token required since we're self-contained
        this.assetsPath = path.join(__dirname, '..', 'assets');
    }

    /**
     * Converts webp URLs to png
     * @private
     */
    _convertWebpUrl(url) {
        if (url && url.endsWith('.webp')) {
            return url.replace('.webp', '.png');
        }
        return url;
    }

    /**
     * Loads an image from URL or file path
     * @private
     */
    async _loadImage(source) {
        try {
            // Check if it's a URL
            if (source.startsWith('http://') || source.startsWith('https://')) {
                return await loadImage(source);
            }
            // Otherwise treat as file path
            return await loadImage(path.resolve(source));
        } catch (error) {
            throw new Error(`Failed to load image: ${error.message}`);
        }
    }

    /**
     * Loads a local asset image
     * @private
     */
    async _loadAsset(filename) {
        try {
            const filePath = path.join(this.assetsPath, filename);
            return await loadImage(filePath);
        } catch (error) {
            throw new Error(`Failed to load asset ${filename}: ${error.message}`);
        }
    }

    /**
     * Sends a random anime quote.
     * @returns {json}
     */
    async animequotes() {
        try {
            const response = await fetch('https://yurippe.vercel.app/api/quotes?random=1');

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const quotes = await response.json();

            if (!quotes || !Array.isArray(quotes) || quotes.length === 0) {
                // Fallback to default quote if API fails
                return {
                    quote: "In the world of code, there are no mistakes, only happy accidents.",
                    character: "Programmer-san",
                    show: "Silicon Valley Chronicles"
                };
            }

            // Return the first quote
            const quote = quotes[0];
            return {
                quote: quote.quote,
                character: quote.character,
                show: quote.show || quote.anime || "Unknown Anime"
            };
        } catch (error) {
            console.error('Error fetching anime quote:', error.message);
            // Fallback quote
            return {
                quote: "Even the greatest warriors need rest. But the war against bugs never ends.",
                character: "Dev-kun",
                show: "Programming Wars"
            };
        }
    }
    /**
     * Generates a Meme on SaveHumanity.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async savehumanity(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(720, 723);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('humanity.jpg');
            ctx.drawImage(image, 0, 0, 720, 723);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 450, 490);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Stonks.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async stonks(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(408, 408);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('stonks.jpg');
            ctx.drawImage(image, 0, 0, 408, 408);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 10, 22);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on abandon.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async abandon(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.savehumanity(text);
    }

    /**
     * Generates a Meme on NotStonks.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async notstonks(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.stonks(text);
    }

    /**
     * Generates a Meme on Piccolo.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async piccolo(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.ohno(text);
    }

    /**
     * Generates a Meme on Tornado.
     * @param {string} text Text to Generate meme
     * @param {string} text2 Text2 to Generate meme
     * @returns {Promise<Buffer>}
     */
    async tornado(text, text2) {
        if (!text) throw new SyntaxError('You are missing the Text');
        if (!text2) throw new SyntaxError('You are missing the Text 2');

        const combinedText = `${text} ${text2}`;
        return this.ohno(combinedText);
    }

    /**
     * Generates a Meme on Ohno.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async ohno(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(640, 640);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('ohno.jpg');
            ctx.drawImage(image, 0, 0, 640, 640);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 340, 20);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Drake.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async drake(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.savehumanity(text);
    }

    /**
     * Generates a PepeSign meme.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async pepesign(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.changemymind(text);
    }

    /**
     * Generates a Meme on VR.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async vr(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(680, 670);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('vr.jpg');
            ctx.drawImage(image, 0, 0, 680, 670);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 80, 485);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Search.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async search(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(700, 612);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('search.jpg');
            ctx.drawImage(image, 0, 0, 700, 612);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 65, 355);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Failure.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async failure(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(572, 767);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('failure.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 572, 767);
            ctx.drawImage(imageperson, 143, 525, 215, 215);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Trash.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async trash(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(960, 960);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('trash.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 960, 960);
            ctx.drawImage(imageperson, 480, 0, 483, 483);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Satan.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async satan(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(600, 450);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('satan.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 600, 450);
            ctx.drawImage(imageperson, 200, 90, 195, 195);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Stroke.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async stroke(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(490, 492);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('stroke.jpg');
            ctx.drawImage(image, 0, 0, 490, 492);
            ctx.font = "12px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 272, 300);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Roblox.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async roblox(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(420, 420);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('roblox.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 420, 420);
            ctx.drawImage(imageperson, 168, 41, 56, 74);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Hitler.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async hitler(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(480, 360);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('hitler.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 480, 360);
            ctx.drawImage(imageperson, 43, 43, 140, 140);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Bed.
     * @param {string} avatar1 Avatar1 URL or file path to Generate meme
     * @param {string} avatar2 Avatar2 URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async bed(avatar1, avatar2) {
        if (!avatar1) throw new SyntaxError("You are Missing the first AVATAR");
        if (!avatar2) throw new SyntaxError("You are Missing the second AVATAR");

        try {
            avatar1 = this._convertWebpUrl(avatar1);
            avatar2 = this._convertWebpUrl(avatar2);
            const canvas = createCanvas(316, 768);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('bed.jpg');
            const imageperson1 = await this._loadImage(avatar1);
            const imageperson2 = await this._loadImage(avatar2);
            ctx.drawImage(image, 0, 0, 316, 768);
            ctx.drawImage(imageperson1, 25, 100, 100, 100);
            ctx.drawImage(imageperson1, 25, 300, 100, 100);
            ctx.drawImage(imageperson2, 53, 450, 100, 100);
            ctx.drawImage(imageperson1, 53, 575, 70, 70);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Jail.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async jail(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(350, 350);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('jail.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 0, 0, 350, 350);
            ctx.drawImage(image, 0, 0, 350, 350);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Delete.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async delete(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(748, 356);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('delete.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 748, 356);
            ctx.drawImage(imageperson, 120, 135, 195, 195);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on EmergencyMeeting.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async emergencymeeting(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.vr(text);
    }

    /**
     * Generates a Meme on Byemom.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @param {string} username Username of the user to Generate meme
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async byemom(avatar, username, text) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!username) throw new SyntaxError("You are Missing the USERNAME");
        if (!text) throw new SyntaxError('You are missing the Text');

        const combinedText = `${username}: ${text}`;
        return this.tweet(avatar, username, combinedText);
    }

    /**
     * Generates a Meme on Draw25.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async draw25(avatar, text) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!text) throw new SyntaxError('You are missing the Text');

        return this.failure(avatar);
    }

    /**
     * Generates a Meme on Walking.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async walking(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(1080, 1080);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('walking.jpg');
            ctx.drawImage(image, 0, 0, 1080, 1080);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 35, 35);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Keepdistance.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async keepdistance(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(640, 863);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('keepdistance.jpg');
            ctx.drawImage(image, 0, 0, 640, 863);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(text, 92, 700);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Fakenews.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async fakenews(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(1200, 786);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('fakenews.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 390, 0, 447, 447);
            ctx.drawImage(image, 0, 0, 1200, 786);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Wanted.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async wanted(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(736, 959);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('wanted.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 736, 959);
            ctx.drawImage(imageperson, 145, 282, 447, 447);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Godwhy.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async godwhy(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(1061, 1080);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('godwhy.jpg');
            ctx.drawImage(image, 0, 0, 1061, 1080);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 35, 580);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Violence.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async violence(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(640, 737);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('violence.jpg');
            ctx.drawImage(image, 0, 0, 640, 737);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 370, 20);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Ipad.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async ipad(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.roblox(avatar);
    }

    /**
     * Generates a Meme on Laid.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async laid(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(900, 504);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('laid.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 900, 504);
            ctx.drawImage(imageperson, 512, 360, 115, 115);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Ugly.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async ugly(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(600, 418);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('ugly.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 600, 418);
            ctx.drawImage(imageperson, 120, 55, 175, 175);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Shit.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async shit(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.godwhy(text);
    }

    /**
     * Generates a Meme on humansgood.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async humansgood(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(930, 928);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('humansgood.jpg');
            ctx.drawImage(image, 0, 0, 930, 928);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 525, 782);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on whodidthis.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async whodidthis(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.wanted(avatar);
    }

    /**
     * Generates a Meme on Floor.
     * @param {string} text Text to Generate meme
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async floor(text, avatar) {
        if (!text) throw new SyntaxError('You are missing the Text');
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        return this.obama(text, avatar);
    }

    /**
     * Generates a Meme on Obama.
     * @param {string} text Text to Generate meme
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async obama(text, avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(600, 400);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, 600, 400);

            if (avatar) {
                avatar = this._convertWebpUrl(avatar);
                const imageperson = await this._loadImage(avatar);
                ctx.drawImage(imageperson, 50, 50, 150, 150);
            }

            ctx.font = "24px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 220, 150);
            ctx.font = "18px Arial";
            ctx.fillText("- Barack Obama", 220, 200);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Note.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async note(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(500, 200);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#ffffcc';
            ctx.fillRect(0, 0, 500, 200);
            ctx.strokeStyle = '#cccc99';
            ctx.lineWidth = 2;
            ctx.strokeRect(0, 0, 500, 200);

            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";

            const words = text.split(' ');
            let line = '';
            let y = 50;
            const lineHeight = 30;
            const maxWidth = 450;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, 25, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 25, y);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on America.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async america(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.communism(avatar);
    }

    /**
     * Generates a Meme on Aborted.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async aborted(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.delete(avatar);
    }

    /**
     * Generates a Meme on Affect.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async affect(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.laid(avatar);
    }

    /**
     * Generates a Meme on Armor.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async armor(text) {
        if (!text) throw new SyntaxError('You are missing the Text');
        return this.facts(text);
    }

    /**
     * Generates a Meme on Facts.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async facts(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(500, 200);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 500, 200);

            ctx.font = "bold 28px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("FACT:", 20, 50);

            ctx.font = "20px Arial";
            ctx.fillText(text, 20, 100);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Bongocat.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async bongocat(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(400, 300);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#ff9999';
            ctx.beginPath();
            ctx.arc(200, 150, 100, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(120, 70);
            ctx.lineTo(150, 50);
            ctx.lineTo(180, 70);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(220, 70);
            ctx.lineTo(250, 50);
            ctx.lineTo(280, 70);
            ctx.fill();

            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(160, 130, 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(240, 130, 20, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(160, 130, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(240, 130, 8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#8b4513';
            ctx.beginPath();
            ctx.ellipse(100, 220, 40, 20, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(300, 220, 40, 20, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ff9999';
            ctx.beginPath();
            ctx.ellipse(80, 200, 15, 10, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(320, 200, 15, 10, 0, 0, Math.PI * 2);
            ctx.fill();

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Brazzers.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async brazzers(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(500, 500);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, 500, 500);

            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 50, 50, 400, 400);

            ctx.font = "bold 48px Arial";
            ctx.fillStyle = "#ff9900";
            ctx.fillText("BRAZZERS", 100, 430);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Cancer.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async cancer(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        return this.brazzers(avatar);
    }

    /**
     * Generates a Meme on Changemymind.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async changemymind(text) {
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            const canvas = createCanvas(768, 568);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('changemymind.jpg');
            ctx.drawImage(image, 0, 0, 768, 568);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000";
            ctx.fillText(text, 310, 320);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Communism.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async communism(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(500, 500);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, 500, 500);

            ctx.fillStyle = '#ffcc00';

            ctx.fillRect(200, 200, 100, 20);
            ctx.fillRect(180, 180, 40, 40);

            ctx.beginPath();
            ctx.arc(300, 200, 80, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.lineTo(320, 200);
            ctx.closePath();
            ctx.fill();

            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 20, 20, 100, 100);

            ctx.font = "bold 32px Arial";
            ctx.fillStyle = "#ffcc00";
            ctx.fillText("COMMUNISM", 150, 450);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Corporate.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async corporate(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(500, 400);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#1a3c6e';
            ctx.fillRect(0, 0, 500, 400);

            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.moveTo(250, 100);
            ctx.lineTo(230, 200);
            ctx.lineTo(250, 250);
            ctx.lineTo(270, 200);
            ctx.closePath();
            ctx.fill();

            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 175, 50, 150, 150);

            ctx.font = "bold 28px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText("CORPORATE", 180, 350);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Cry.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async cry(text) {
        if (!text) throw new SyntaxError("You are Missing the Text");

        try {
            const canvas = createCanvas(626, 768);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('cry.jpg');
            ctx.drawImage(image, 0, 0, 626, 768);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 382, 80);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Dab.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async dab(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(800, 611);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('dab.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 300, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 800, 611);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Disability.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async disability(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(663, 618);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('disability.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 663, 618);
            ctx.drawImage(imageperson, 450, 325, 175, 175);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Door.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async door(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(1000, 479);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('door.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 250, 0, 479, 479);
            ctx.drawImage(image, 0, 0, 1000, 479);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Egg.
     * @param {string} avatar Avatar URL or file path to Generate meme
     * @returns {Promise<Buffer>}
     */
    async egg(avatar) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(350, 350);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('egg.jpg');
            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(image, 0, 0, 350, 350);
            ctx.drawImage(imageperson, 143, 188, 50, 50);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Excuseme.
     * @param {string} text Text to Generate meme
     * @returns {Promise<Buffer>}
     */
    async excuseme(text) {
        if (!text) throw new SyntaxError("You are Missing the Text");

        try {
            const canvas = createCanvas(807, 745);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('excuseme.jpg');
            ctx.drawImage(image, 0, 0, 807, 745);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text, 20, 15);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Youtube Comment.
     * @param {string} avatar Avatar URL or file path to Generate youtube comment
     * @param {string} username Username of the user to Generate youtube comment
     * @param {string} text Text to Generate youtube comment
     * @returns {Promise<Buffer>}
     */
    async youtube(avatar, username, text) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!username) throw new SyntaxError("You are Missing the USERNAME");
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(600, 200);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#f9f9f9';
            ctx.fillRect(0, 0, 600, 200);

            const imageperson = await this._loadImage(avatar);
            ctx.drawImage(imageperson, 20, 20, 50, 50);

            ctx.font = "bold 16px Arial";
            ctx.fillStyle = "#065fd4";
            ctx.fillText(username, 80, 35);

            ctx.font = "12px Arial";
            ctx.fillStyle = "#606060";
            ctx.fillText("2 hours ago", 80, 55);

            ctx.font = "14px Arial";
            ctx.fillStyle = "#030303";

            const words = text.split(' ');
            let line = '';
            let y = 90;
            const lineHeight = 20;
            const maxWidth = 550;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, 20, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 20, y);

            ctx.fillStyle = '#cccccc';
            ctx.fillRect(20, y + 40, 30, 30);
            ctx.fillRect(60, y + 40, 30, 30);
            ctx.fillRect(100, y + 40, 60, 30);

            ctx.font = "12px Arial";
            ctx.fillStyle = "#606060";
            ctx.fillText("👍", 28, y + 60);
            ctx.fillText("👎", 68, y + 60);
            ctx.fillText("REPLY", 108, y + 60);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Welcome.
     * @param {string} username Username of the user to Generate welcome image
     * @param {string} avatar Avatar URL or file path to Generate welcome image
     * @param {string} background Background URL or file path to Generate welcome image
     * @returns {Promise<Buffer>}
     */
    async welcome(username, avatar, background) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!username) throw new SyntaxError("You are Missing the USERNAME");
        if (!background) throw new SyntaxError("You are Missing the BACKGROUND");

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(700, 300);
            const ctx = canvas.getContext("2d");

            try {
                const bgImage = await this._loadImage(background);
                ctx.drawImage(bgImage, 0, 0, 700, 300);
            } catch {
                const gradient = ctx.createLinearGradient(0, 0, 700, 300);
                gradient.addColorStop(0, '#4facfe');
                gradient.addColorStop(1, '#00f2fe');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 700, 300);
            }

            const imageperson = await this._loadImage(avatar);
            ctx.save();
            ctx.beginPath();
            ctx.arc(100, 150, 60, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(imageperson, 40, 90, 120, 120);
            ctx.restore();

            ctx.lineWidth = 5;
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            ctx.arc(100, 150, 60, 0, Math.PI * 2);
            ctx.stroke();

            ctx.font = "bold 32px Arial";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("WELCOME", 350, 100);

            ctx.font = "28px Arial";
            ctx.fillText(username, 350, 150);

            ctx.font = "20px Arial";
            ctx.fillText("to the server!", 350, 200);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Meme on Leave.
     * @param {string} username Username of the user to Generate leave image
     * @param {string} avatar Avatar URL or file path to Generate leave image
     * @param {string} background Background URL or file path to Generate leave image
     * @returns {Promise<Buffer>}
     */
    async leave(username, avatar, background) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!username) throw new SyntaxError("You are Missing the USERNAME");
        if (!background) throw new SyntaxError("You are Missing the BACKGROUND");

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(700, 300);
            const ctx = canvas.getContext("2d");

            try {
                const bgImage = await this._loadImage(background);
                ctx.drawImage(bgImage, 0, 0, 700, 300);
            } catch {
                const gradient = ctx.createLinearGradient(0, 0, 700, 300);
                gradient.addColorStop(0, '#ff6b6b');
                gradient.addColorStop(1, '#ffa8a8');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 700, 300);
            }

            const imageperson = await this._loadImage(avatar);
            ctx.save();
            ctx.beginPath();
            ctx.arc(100, 150, 60, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(imageperson, 40, 90, 120, 120);
            ctx.restore();

            ctx.lineWidth = 5;
            ctx.strokeStyle = '#fff';
            ctx.beginPath();
            ctx.arc(100, 150, 60, 0, Math.PI * 2);
            ctx.stroke();

            ctx.font = "bold 32px Arial";
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.fillText("GOODBYE", 350, 100);

            ctx.font = "28px Arial";
            ctx.fillText(username, 350, 150);

            ctx.font = "20px Arial";
            ctx.fillText("has left the server!", 350, 200);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Twitter Tweet.
     * @param {string} avatar Avatar URL or file path to Generate Twitter Tweet
     * @param {string} username Username of the user to Generate Twitter Tweet
     * @param {string} text Text to Generate Twitter Tweet
     * @returns {Promise<Buffer>}
     */
    async tweet(avatar, username, text) {
        if (!avatar) throw new SyntaxError('You are missing the Avatar');
        if (!username) throw new SyntaxError("You are Missing the USERNAME");
        if (!text) throw new SyntaxError('You are missing the Text');

        try {
            avatar = this._convertWebpUrl(avatar);
            const canvas = createCanvas(600, 300);
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = '#15202b';
            ctx.fillRect(0, 0, 600, 300);

            const imageperson = await this._loadImage(avatar);
            ctx.save();
            ctx.beginPath();
            ctx.arc(50, 50, 30, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(imageperson, 20, 20, 60, 60);
            ctx.restore();

            ctx.font = "bold 16px Arial";
            ctx.fillStyle = "#fff";
            ctx.fillText(username, 90, 40);

            ctx.font = "14px Arial";
            ctx.fillStyle = "#8899a6";
            ctx.fillText(`@${username.toLowerCase().replace(/\s/g, '')}`, 90, 60);

            ctx.font = "16px Arial";
            ctx.fillStyle = "#fff";

            const words = text.split(' ');
            let line = '';
            let y = 120;
            const lineHeight = 25;
            const maxWidth = 550;

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = ctx.measureText(testLine);
                const testWidth = metrics.width;

                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, 20, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, 20, y);

            const statsY = y + 50;
            ctx.font = "14px Arial";
            ctx.fillStyle = "#8899a6";

            ctx.fillText("💬 12", 20, statsY);
            ctx.fillText("🔁 45", 100, statsY);
            ctx.fillText("❤️ 128", 180, statsY);
            ctx.fillText("📤", 260, statsY);

            ctx.fillText("· 2h", 300, statsY);

            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Kiss meme (for two avatars)
     * @param {string} avatar1 First avatar URL or file path
     * @param {string} avatar2 Second avatar URL or file path
     * @returns {Promise<Buffer>}
     */
    async kiss(avatar1, avatar2) {
        if (!avatar1) throw new SyntaxError('You are missing the first Avatar');
        if (!avatar2) throw new SyntaxError('You are missing the second Avatar');

        try {
            avatar1 = this._convertWebpUrl(avatar1);
            avatar2 = this._convertWebpUrl(avatar2);
            const canvas = createCanvas(768, 574);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('kiss.jpg');
            const imageperson1 = await this._loadImage(avatar1);
            const imageperson2 = await this._loadImage(avatar2);
            ctx.drawImage(image, 0, 0, 768, 574);
            ctx.drawImage(imageperson1, 150, 25, 200, 200);
            ctx.drawImage(imageperson2, 370, 25, 200, 200);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a Slap meme (for two avatars)
     * @param {string} avatar1 First avatar URL or file path
     * @param {string} avatar2 Second avatar URL or file path
     * @returns {Promise<Buffer>}
     */
    async slap(avatar1, avatar2) {
        if (!avatar1) throw new SyntaxError('You are missing the first Avatar');
        if (!avatar2) throw new SyntaxError('You are missing the second Avatar');

        try {
            avatar1 = this._convertWebpUrl(avatar1);
            avatar2 = this._convertWebpUrl(avatar2);
            const canvas = createCanvas(1000, 500);
            const ctx = canvas.getContext("2d");
            const image = await this._loadAsset('slap.jpg');
            const imageperson1 = await this._loadImage(avatar1);
            const imageperson2 = await this._loadImage(avatar2);
            ctx.drawImage(image, 0, 0, 1000, 500);
            ctx.drawImage(imageperson1, 580, 260, 200, 200);
            ctx.drawImage(imageperson2, 350, 70, 200, 200);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Meme;