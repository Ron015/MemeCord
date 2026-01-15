const { createCanvas, loadImage, registerFont } = require("canvas");
const fs = require("fs").promises;
const path = require("path");
const fetch = require('node-fetch');

class Meme {
    constructor() {
        this.assetsPath = path.join(__dirname, 'assets');
    }

    async _loadImage(source) {
        try {
            if (source.startsWith('http://') || source.startsWith('https://')) {
                const response = await fetch(source);
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
                }
                const buffer = await response.buffer();
                return await loadImage(buffer);
            }
            return await loadImage(path.resolve(source));
        } catch (error) {
            throw new Error(`Failed to load image: ${error.message}`);
        }
    }

    async _loadAsset(filename) {
        try {
            const filePath = path.join(this.assetsPath, filename);
            return await loadImage(filePath);
        } catch (error) {
            throw new Error(`Failed to load asset: ${filename} - ${error.message}`);
        }
    }

    _wrapText(ctx, text, maxWidth, fontSize = 16) {
        ctx.font = `${fontSize}px Arial`;
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    async abandon(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('abandon.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 320, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 25, 413 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate abandon meme: ${error.message}`);
        }
    }

    async aborted(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('aborted.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 390, 130, 90, 90);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate aborted meme: ${error.message}`);
        }
    }

    async affect(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('affect.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 180, 383, 200, 157);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate affect meme: ${error.message}`);
        }
    }

    async america(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('america.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(256, 256);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0, 256, 256);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(avatar, 0, 0, 256, 256);
            ctx.globalAlpha = 1.0;
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate america meme: ${error.message}`);
        }
    }

    async armor(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('armor.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 207, 20);
            lines.forEach((line, i) => {
                ctx.fillText(line, 34, 371 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate armor meme: ${error.message}`);
        }
    }

    async balloon(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('balloon.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text1, 80, 180);
            ctx.font = "18px Arial";
            ctx.fillText(text1, 50, 530);
            ctx.fillText(text1, 500, 520);
            ctx.font = "20px Arial";
            ctx.fillText(text2, 620, 155);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate balloon meme: ${error.message}`);
        }
    }

    async bed(avatar0, avatar1) {
        try {
            if (!avatar0 || !avatar1) {
                throw new Error('Both avatar URLs or paths are required');
            }
            const base = await this._loadAsset('bed.jpg');
            const avatar = await this._loadImage(avatar0);
            const avatar2 = await this._loadImage(avatar1);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 25, 100, 100, 100);
            ctx.drawImage(avatar, 25, 300, 100, 100);
            ctx.drawImage(avatar2, 53, 450, 70, 70);
            ctx.drawImage(avatar2, 53, 575, 70, 70);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate bed meme: ${error.message}`);
        }
    }

    async bongocat(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('bongocat.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 0, 0, base.width, base.height);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate bongocat meme: ${error.message}`);
        }
    }

    async boo(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('boo.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(text1, 35, 54);
            ctx.fillText(text2, 267, 57);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate boo meme: ${error.message}`);
        }
    }

    async brain(text1, text2, text3, text4) {
        try {
            if (!text1 || !text2 || !text3 || !text4 || 
                typeof text1 !== 'string' || typeof text2 !== 'string' || 
                typeof text3 !== 'string' || typeof text4 !== 'string') {
                throw new Error('All four text parameters are required and must be strings');
            }
            const base = await this._loadAsset('brain.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 225, 30);
            const lines2 = this._wrapText(ctx, text2, 225, 30);
            const lines3 = this._wrapText(ctx, text3, 225, 30);
            const lines4 = this._wrapText(ctx, text4, 225, 30);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 15, 40 + (i * 35));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 15, 230 + (i * 35));
            });
            lines3.forEach((line, i) => {
                ctx.fillText(line, 15, 420 + (i * 35));
            });
            lines4.forEach((line, i) => {
                ctx.fillText(line, 15, 610 + (i * 35));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate brain meme: ${error.message}`);
        }
    }

    async brazzers(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const avatar = await this._loadImage(avatar0);
            const base = await this._loadAsset('brazzers.jpg');
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 0, 0);
            ctx.drawImage(base, avatar.width - base.width, avatar.height - base.height);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate brazzers meme: ${error.message}`);
        }
    }

    async byemom(avatar0, username0, text) {
        try {
            if (!avatar0 || !username0 || !text) {
                throw new Error('avatar0, username0, and text parameters are all required');
            }
            if (typeof username0 !== 'string' || typeof text !== 'string') {
                throw new Error('username0 and text must be strings');
            }
            const base = await this._loadAsset('byemom.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 530, 15, 70, 70);
            ctx.drawImage(avatar, 70, 340, 125, 125);
            ctx.font = "14px Arial";
            ctx.fillStyle = "#2a28a5";
            const msg = `Alright ${username0} im leaving the house to run some errands`;
            const msgLines = this._wrapText(ctx, msg, 200, 14);
            msgLines.forEach((line, i) => {
                ctx.fillText(line, 150, 20 + (i * 20));
            });
            ctx.save();
            ctx.translate(350, 443);
            ctx.rotate(24.75 * Math.PI / 180);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const textLines = this._wrapText(ctx, text, 500, 20);
            textLines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 25);
            });
            ctx.restore();
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate byemom meme: ${error.message}`);
        }
    }

    async cancer(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('cancer.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 351, 200, 100, 100);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate cancer meme: ${error.message}`);
        }
    }

    async changemymind(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('changemymind.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.translate(290, 300);
            ctx.rotate(23 * Math.PI / 180);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 310, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 30);
            });
            ctx.restore();
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate changemymind meme: ${error.message}`);
        }
    }

    async cheating(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('cheating.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "26px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1, 150, 26);
            const lines2 = this._wrapText(ctx, text2, 150, 26);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 15, 300 + (i * 30));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 155, 200 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate cheating meme: ${error.message}`);
        }
    }

    async citation(text1, text2, text3) {
        try {
            if (!text1 || !text2 || !text3 || 
                typeof text1 !== 'string' || typeof text2 !== 'string' || typeof text3 !== 'string') {
                throw new Error('All three text parameters are required and must be strings');
            }
            const base = await this._loadAsset('citation.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 320, 16);
            const lines2 = this._wrapText(ctx, text2, 320, 16);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 20, 10 + (i * 20));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 20, 45 + (i * 20));
            });
            const textWidth = ctx.measureText(text3).width;
            const x = (base.width - textWidth) / 2;
            ctx.fillText(text3, x, 130);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate citation meme: ${error.message}`);
        }
    }

    async communism(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('communism.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(256, 256);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0, 256, 256);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(avatar, 0, 0, 256, 256);
            ctx.globalAlpha = 1.0;
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate communism meme: ${error.message}`);
        }
    }

    async confusedcat(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('confusedcat.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "36px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 510, 36);
            const lines2 = this._wrapText(ctx, text2, 510, 36);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 5, 35 + (i * 40));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 516, 35 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate confusedcat meme: ${error.message}`);
        }
    }

    async cry(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('cry.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 180, 20);
            lines.forEach((line, i) => {
                ctx.fillText(line, 382, 80 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate cry meme: ${error.message}`);
        }
    }

    async dab(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('dab.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 300, 0, 500, 500);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate dab meme: ${error.message}`);
        }
    }

    async delete(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('delete.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 120, 135, 195, 195);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate delete meme: ${error.message}`);
        }
    }

    async disability(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('disability.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 450, 325, 175, 175);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate disability meme: ${error.message}`);
        }
    }

    async doglemon(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('doglemon.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 450, 30);
            const lines2 = this._wrapText(ctx, text2, 450, 30);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 850, 100 + (i * 35));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 500, 100 + (i * 35));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate doglemon meme: ${error.message}`);
        }
    }

    async door(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('door.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 250, 0, 479, 479);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate door meme: ${error.message}`);
        }
    }

    async egg(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('egg.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(350, 350);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0, 350, 350);
            ctx.drawImage(avatar, 143, 188, 50, 50);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate egg meme: ${error.message}`);
        }
    }

    async emergencymeeting(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('emergencymeeting.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text.slice(0, 140), 750, 33);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 40);
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate emergencymeeting meme: ${error.message}`);
        }
    }

    async excuseme(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('excuseme.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "40px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 787, 40);
            lines.forEach((line, i) => {
                ctx.fillText(line, 20, 15 + (i * 50));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate excuseme meme: ${error.message}`);
        }
    }

    async expandingwwe(text1, text2, text3, text4, text5) {
        try {
            if (!text1 || !text2 || !text3 || !text4 || !text5 || 
                typeof text1 !== 'string' || typeof text2 !== 'string' || typeof text3 !== 'string' || 
                typeof text4 !== 'string' || typeof text5 !== 'string') {
                throw new Error('All five text parameters are required and must be strings');
            }
            const base = await this._loadAsset('expandingwwe.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 225, 30);
            const lines2 = this._wrapText(ctx, text2, 225, 30);
            const lines3 = this._wrapText(ctx, text3, 225, 30);
            const lines4 = this._wrapText(ctx, text4, 225, 30);
            const lines5 = this._wrapText(ctx, text5, 225, 30);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 5, 5 + (i * 35));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 5, 205 + (i * 35));
            });
            lines3.forEach((line, i) => {
                ctx.fillText(line, 5, 410 + (i * 35));
            });
            lines4.forEach((line, i) => {
                ctx.fillText(line, 5, 620 + (i * 35));
            });
            lines5.forEach((line, i) => {
                ctx.fillText(line, 5, 825 + (i * 35));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate expandingwwe meme: ${error.message}`);
        }
    }

    async facts(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('facts.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.translate(90, 600);
            ctx.rotate(-13 * Math.PI / 180);
            ctx.font = "25px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 400, 25);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 30);
            });
            ctx.restore();
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate facts meme: ${error.message}`);
        }
    }

    async failure(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('failure.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 143, 525, 215, 215);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate failure meme: ${error.message}`);
        }
    }

    async fakenews(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('fakenews.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 390, 0, 400, 400);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate fakenews meme: ${error.message}`);
        }
    }

    async farmer(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('farmer.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1.slice(0, 150), 580, 24);
            const lines2 = this._wrapText(ctx, text2.slice(0, 100), 580, 24);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 50, 300 + (i * 30));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 50, 825 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate farmer meme: ${error.message}`);
        }
    }

    async fedora(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('fedora.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 112, 101, 275, 275);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate fedora meme: ${error.message}`);
        }
    }

    async floor(avatar0, text) {
        try {
            if (!avatar0 || !text) {
                throw new Error('Both avatar URL/path and text parameters are required');
            }
            if (typeof text !== 'string') {
                throw new Error('Text must be a string');
            }
            const base = await this._loadAsset('floor.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 100, 90, 45, 45);
            ctx.drawImage(avatar, 330, 90, 23, 23);
            ctx.font = "22px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 300, 22);
            lines.forEach((line, i) => {
                ctx.fillText(line, 168, 36 + (i * 25));
            });
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate floor meme: ${error.message}`);
        }
    }

    async fuck(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('fuck.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1, 320, 24);
            const lines2 = this._wrapText(ctx, text2, 320, 24);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 200, 600 + (i * 30));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 750, 700 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate fuck meme: ${error.message}`);
        }
    }

    async garfield(text, avatar0) {
        try {
            if (!text || !avatar0) {
                throw new Error('Both text and avatar URL/path parameters are required');
            }
            if (typeof text !== 'string') {
                throw new Error('Text must be a string');
            }
            const base = await this._loadAsset('garfield.jpg');
            const avatar = await this._loadImage(avatar0);
            const noEntry = await this._loadAsset('noentry.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 296, 219, 192, 192);
            ctx.drawImage(noEntry, 280, 203, 224, 224);
            ctx.drawImage(avatar, 40, 210, 212, 212);
            ctx.font = "28px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, base.width, 28);
            lines.forEach((line, i) => {
                ctx.fillText(line, 15, 0 + (i * 35));
            });
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate garfield meme: ${error.message}`);
        }
    }

    async gay(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('gay.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 0, 0);
            ctx.globalAlpha = 0.5;
            ctx.drawImage(base, 0, 0, avatar.width, avatar.height);
            ctx.globalAlpha = 1.0;
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate gay meme: ${error.message}`);
        }
    }

    async godwhy(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('godwhy.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text.slice(0, 127), 370, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 35, 560 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate godwhy meme: ${error.message}`);
        }
    }

    async hitler(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('hitler.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 46, 43, 140, 140);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate hitler meme: ${error.message}`);
        }
    }

    async humansgood(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('humansgood.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 125, 20);
            lines.forEach((line, i) => {
                ctx.fillText(line, 525, 762 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate humansgood meme: ${error.message}`);
        }
    }

    async inator(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('inator.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text, 340, 24);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 370, 0 + (i * 30));
            });
            const vowels = ['i', 'y', 'e', 'a', 'u', 'o'];
            let ending = 'inator';
            for (const vowel of vowels) {
                if (text.endsWith(vowel)) {
                    ending = 'nator';
                    break;
                }
            }
            const fullText = text + ending;
            const lines2 = this._wrapText(ctx, fullText, 335, 24);
            lines2.forEach((line, i) => {
                ctx.fillText(line, 370, 380 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate inator meme: ${error.message}`);
        }
    }

    async invert(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(avatar.width, avatar.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            ctx.putImageData(imageData, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate invert meme: ${error.message}`);
        }
    }

    async jail(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('jail.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(350, 350);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 0, 0, 350, 350);
            ctx.drawImage(base, 0, 0, 350, 350);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate jail meme: ${error.message}`);
        }
    }

    async justpretending(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('justpretending.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 320, 24);
            const lines2 = this._wrapText(ctx, text2, 100, 24);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 678, 12 + (i * 30));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 9, 800 + (i * 30));
                ctx.fillText(line, 399, 808 + (i * 30));
                ctx.fillText(line, 59, 917 + (i * 30));
                ctx.fillText(line, 425, 910 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate justpretending meme: ${error.message}`);
        }
    }

    async keepurdistance(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('keepurdistance.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines = this._wrapText(ctx, text.toUpperCase().slice(0, 30), 440, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 92, 660 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate keepurdistance meme: ${error.message}`);
        }
    }

    async knowyourlocation(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('knowyourlocation.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 630, 20);
            const lines2 = this._wrapText(ctx, text2, 539, 20);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 64, 131 + (i * 25));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 120, 450 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate knowyourlocation meme: ${error.message}`);
        }
    }

    async laid(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('laid.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 512, 360, 115, 115);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate laid meme: ${error.message}`);
        }
    }

    async lick(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('lick.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1, 220, 24);
            const lines2 = this._wrapText(ctx, text2, 320, 24);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 80, 200 + (i * 30));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 290, 240 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate lick meme: ${error.message}`);
        }
    }

    async madethis(avatar0, avatar1) {
        try {
            if (!avatar0 || !avatar1) {
                throw new Error('Both avatar URLs or paths are required');
            }
            const base = await this._loadAsset('madethis.jpg');
            const avatar = await this._loadImage(avatar0);
            const avatar2 = await this._loadImage(avatar1);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 92, 271, 130, 130);
            ctx.drawImage(avatar2, 422, 267, 111, 111);
            ctx.drawImage(avatar2, 406, 678, 111, 111);
            ctx.drawImage(avatar2, 412, 1121, 111, 111);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate madethis meme: ${error.message}`);
        }
    }

    async note(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('note.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.translate(455, 420);
            ctx.rotate(-23 * Math.PI / 180);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 150, 16);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 20);
            });
            ctx.restore();
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate note meme: ${error.message}`);
        }
    }

    async nothing(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('nothing.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text.slice(0, 120), 200, 33);
            lines.forEach((line, i) => {
                ctx.fillText(line, 340, 5 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate nothing meme: ${error.message}`);
        }
    }

    async ohno(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('ohno.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            if (text.length > 38) {
                ctx.font = "16px Arial";
            } else {
                ctx.font = "32px Arial";
            }
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 260, text.length > 38 ? 16 : 32);
            lines.forEach((line, i) => {
                ctx.fillText(line, 340, 30 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate ohno meme: ${error.message}`);
        }
    }

    async piccolo(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('piccolo.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text.slice(0, 300), 850, 33);
            lines.forEach((line, i) => {
                ctx.fillText(line, 5, 5 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate piccolo meme: ${error.message}`);
        }
    }

    async plan(text1, text2, text3) {
        try {
            if (!text1 || !text2 || !text3 || 
                typeof text1 !== 'string' || typeof text2 !== 'string' || typeof text3 !== 'string') {
                throw new Error('All three text parameters are required and must be strings');
            }
            const base = await this._loadAsset('plan.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 120, 16);
            const lines2 = this._wrapText(ctx, text2, 120, 16);
            const lines3 = this._wrapText(ctx, text3, 120, 16);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 190, 60 + (i * 20));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 510, 60 + (i * 20));
            });
            lines3.forEach((line, i) => {
                ctx.fillText(line, 190, 280 + (i * 20));
                ctx.fillText(line, 510, 280 + (i * 20));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate plan meme: ${error.message}`);
        }
    }

    async presentation(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('presentation.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 330, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 150, 80 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate presentation meme: ${error.message}`);
        }
    }

    async rip(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('rip.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 175, 385, 300, 300);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate rip meme: ${error.message}`);
        }
    }

    async roblox(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('roblox.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 168, 41, 56, 74);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate roblox meme: ${error.message}`);
        }
    }

    async satan(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('satan.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(avatar, 200, 90, 195, 195);
            ctx.drawImage(base, 0, 0);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate satan meme: ${error.message}`);
        }
    }

    async savehumanity(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('humanity.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.translate(490, 410);
            ctx.rotate(-7 * Math.PI / 180);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 180, 16);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 20);
            });
            ctx.restore();
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate savehumanity meme: ${error.message}`);
        }
    }

    async screams(avatar0, avatar1) {
        try {
            if (!avatar0 || !avatar1) {
                throw new Error('Both avatar URLs or paths are required');
            }
            const base = await this._loadAsset('screams.jpg');
            const avatar = await this._loadImage(avatar0);
            const avatar2 = await this._loadImage(avatar1);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 200, 1, 175, 175);
            ctx.drawImage(avatar2, 136, 231, 156, 156);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate screams meme: ${error.message}`);
        }
    }

    async shit(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('shit.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.translate(0, 570);
            ctx.rotate(52 * Math.PI / 180);
            ctx.font = "30px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 350, 30);
            lines.forEach((line, i) => {
                ctx.fillText(line, 0, i * 35);
            });
            ctx.restore();
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate shit meme: ${error.message}`);
        }
    }

    async slap(avatar0, avatar1) {
        try {
            if (!avatar0 || !avatar1) {
                throw new Error('Both avatar URLs or paths are required');
            }
            const base = await this._loadAsset('slap.jpg');
            const avatar = await this._loadImage(avatar0);
            const avatar2 = await this._loadImage(avatar1);
            const canvas = createCanvas(1000, 500);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0, 1000, 500);
            ctx.drawImage(avatar, 580, 260, 220, 220);
            ctx.drawImage(avatar2, 350, 70, 200, 200);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate slap meme: ${error.message}`);
        }
    }

    async slapsroof(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('slapsroof.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "33px Arial";
            ctx.fillStyle = "#000000";
            const fullText = text + ' in it';
            const lines = this._wrapText(ctx, fullText, 1150, 33);
            lines.forEach((line, i) => {
                ctx.fillText(line, 335, 31 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate slapsroof meme: ${error.message}`);
        }
    }

    async sneakyfox(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('sneakyfox.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "36px Arial";
            ctx.fillStyle = "#000000";
            const lines1 = this._wrapText(ctx, text1, 500, 36);
            const lines2 = this._wrapText(ctx, text2, 450, 36);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 300, 350 + (i * 40));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 670, 120 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate sneakyfox meme: ${error.message}`);
        }
    }

    async spank(avatar0, avatar1) {
        try {
            if (!avatar0 || !avatar1) {
                throw new Error('Both avatar URLs or paths are required');
            }
            const base = await this._loadAsset('spank.jpg');
            const avatar = await this._loadImage(avatar0);
            const avatar2 = await this._loadImage(avatar1);
            const canvas = createCanvas(500, 500);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0, 500, 500);
            ctx.drawImage(avatar, 225, 5, 140, 140);
            ctx.drawImage(avatar2, 350, 220, 120, 120);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate spank meme: ${error.message}`);
        }
    }

    async stroke(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('stroke.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "12px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 75, 12);
            lines.forEach((line, i) => {
                ctx.fillText(line, 272, 287 + (i * 15));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate stroke meme: ${error.message}`);
        }
    }

    async surprised(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('surprised.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "36px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, 'me: ' + text1, 650, 36);
            const lines2 = this._wrapText(ctx, 'also me: ' + text2, 650, 36);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 20, 20 + (i * 40));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 20, 140 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate surprised meme: ${error.message}`);
        }
    }

    async sword(text1, text2, username0) {
        try {
            if (!text1 || !text2 || !username0 || 
                typeof text1 !== 'string' || typeof text2 !== 'string' || typeof username0 !== 'string') {
                throw new Error('All three parameters (text1, text2, username0) are required and must be strings');
            }
            const base = await this._loadAsset('sword.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "48px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(username0, 330, 330);
            const tempCanvas = createCanvas(1200, 800);
            const tempCtx = tempCanvas.getContext("2d");
            tempCtx.font = "48px Arial";
            tempCtx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(tempCtx, text1, 3000, 48);
            lines1.forEach((line, i) => {
                tempCtx.fillText(line, 0, i * 55);
            });
            const textWidth = ctx.measureText(text2).width;
            const x = (base.width - textWidth) / 2;
            ctx.fillText(text2, x - 20, 830);
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate sword meme: ${error.message}`);
        }
    }

    async theoffice(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('theoffice.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "28px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1, 200, 28);
            const lines2 = this._wrapText(ctx, text2, 200, 28);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 125, 200 + (i * 35));
            });
            lines2.forEach((line, i) => {
                ctx.fillText(line, 420, 250 + (i * 35));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate theoffice meme: ${error.message}`);
        }
    }

    async thesearch(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('thesearch.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 178, 16);
            lines.forEach((line, i) => {
                ctx.fillText(line, 65, 335 + (i * 20));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate thesearch meme: ${error.message}`);
        }
    }

    async trash(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('trash.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.filter = 'blur(6px)';
            ctx.drawImage(avatar, 480, 0, 483, 483);
            ctx.filter = 'none';
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate trash meme: ${error.message}`);
        }
    }

    async ugly(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('ugly.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 120, 55, 175, 175);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate ugly meme: ${error.message}`);
        }
    }

    async wanted(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('wanted.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 145, 282, 447, 447);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate wanted meme: ${error.message}`);
        }
    }

    async whodidthis(avatar0) {
        try {
            if (!avatar0) {
                throw new Error('Avatar URL or path is required');
            }
            const base = await this._loadAsset('whodidthis.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 0, 159, 720, 405);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate whodidthis meme: ${error.message}`);
        }
    }

    async whothisis(avatar0, text) {
        try {
            if (!avatar0 || !text) {
                throw new Error('Both avatar URL/path and text parameters are required');
            }
            if (typeof text !== 'string') {
                throw new Error('Text must be a string');
            }
            const base = await this._loadAsset('whothisis.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.drawImage(avatar, 523, 15, 215, 215);
            ctx.drawImage(avatar, 509, 567, 215, 215);
            ctx.font = "40px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(text, 545, 465);
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate whothisis meme: ${error.message}`);
        }
    }

    async walking(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('walking.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "50px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 1000, 50);
            lines.forEach((line, i) => {
                ctx.fillText(line, 35, 35 + (i * 60));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate walking meme: ${error.message}`);
        }
    }

    async vr(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('vr.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "20px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 207, 20);
            const textWidth = ctx.measureText(lines[0]).width;
            const x = 170 - (textWidth / 2);
            lines.forEach((line, i) => {
                ctx.fillText(line, x, 485 + (i * 25));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate vr meme: ${error.message}`);
        }
    }

    async violence(text) {
        try {
            if (!text || typeof text !== 'string') {
                throw new Error('Text parameter is required and must be a string');
            }
            const base = await this._loadAsset('violence.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "24px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 270, 24);
            lines.forEach((line, i) => {
                ctx.fillText(line, 355, 0 + (i * 30));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate violence meme: ${error.message}`);
        }
    }

    async violentsparks(text1, text2) {
        try {
            if (!text1 || !text2 || typeof text1 !== 'string' || typeof text2 !== 'string') {
                throw new Error('Both text1 and text2 parameters are required and must be strings');
            }
            const base = await this._loadAsset('violentsparks.jpg');
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.font = "36px Arial";
            ctx.fillStyle = "#FFFFFF";
            const lines1 = this._wrapText(ctx, text1, 550, 36);
            lines1.forEach((line, i) => {
                ctx.fillText(line, 15, 5 + (i * 40));
            });
            ctx.fillStyle = "#000000";
            const lines2 = this._wrapText(ctx, text2, 200, 36);
            lines2.forEach((line, i) => {
                ctx.fillText(line, 350, 430 + (i * 40));
            });
            return canvas.toBuffer("image/jpeg");
        } catch (error) {
            throw new Error(`Failed to generate violentsparks meme: ${error.message}`);
        }
    }

    async youtube(avatar0, username0, text) {
        try {
            if (!avatar0 || !username0 || !text) {
                throw new Error('avatar0, username0, and text parameters are all required');
            }
            if (typeof username0 !== 'string' || typeof text !== 'string') {
                throw new Error('username0 and text must be strings');
            }
            const base = await this._loadAsset('youtube.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.beginPath();
            ctx.arc(43, 59, 26, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 17, 33, 52, 52);
            ctx.restore();
            ctx.font = "bold 17px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(username0, 92, 34);
            const time = Math.floor(Math.random() * 59) + 1;
            const plural = time === 1 ? '' : 's';
            ctx.font = "17px Arial";
            ctx.fillStyle = "grey";
            ctx.fillText(`${time} minute${plural} ago`, 92 + ctx.measureText(username0).width + 8, 34);
            ctx.font = "19px Arial";
            ctx.fillStyle = "#000000";
            const lines = this._wrapText(ctx, text, 550, 19);
            lines.forEach((line, i) => {
                ctx.fillText(line, 92, 59 + (i * 25));
            });
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate youtube meme: ${error.message}`);
        }
    }

    async tweet(avatar0, username0, text, username1) {
        try {
            if (!avatar0 || !username0 || !text) {
                throw new Error('avatar0, username0, and text parameters are all required');
            }
            if (typeof username0 !== 'string' || typeof text !== 'string') {
                throw new Error('username0 and text must be strings');
            }
            const base = await this._loadAsset('tweet.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(base.width, base.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(base, 0, 0);
            ctx.save();
            ctx.beginPath();
            ctx.arc(91, 87, 49, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 42, 38, 98, 98);
            ctx.restore();
            ctx.font = "bold 50px Arial";
            ctx.fillStyle = "#000000";
            ctx.fillText(username0, 160, 45);
            const handle = username1 || username0;
            ctx.font = "29px Arial";
            ctx.fillStyle = "grey";
            ctx.fillText(`@${handle}`, 160, 95);
            const now = new Date();
            const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()} ${now.toLocaleString('en-US', { month: 'short' })} ${now.getFullYear()}`;
            ctx.fillText(time, 40, 570);
            const retweets = Math.floor(Math.random() * 99999);
            const likes = Math.floor(Math.random() * 99999);
            ctx.font = "35px Arial";
            ctx.fillStyle = "#2C5F63";
            ctx.fillText(retweets.toLocaleString(), 40, 486);
            ctx.fillText(likes.toLocaleString(), 205, 486);
            let x = 45;
            let y = 160;
            const words = text.split(' ');
            for (const word of words) {
                if (word.startsWith('@') || word.startsWith('#')) {
                    ctx.fillStyle = '#1b95e0';
                } else {
                    ctx.fillStyle = '#000000';
                }
                const width = ctx.measureText(word + ' ').width;
                if (x + width > 1000) {
                    x = 45;
                    y += 65;
                }
                ctx.fillText(word + ' ', x, y);
                x += width;
            }
            return canvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate tweet meme: ${error.message}`);
        }
    }

    async quote(avatar0, username0, text) {
        try {
            if (!avatar0 || !username0 || !text) {
                throw new Error('avatar0, username0, and text parameters are all required');
            }
            if (typeof username0 !== 'string' || typeof text !== 'string') {
                throw new Error('username0 and text must be strings');
            }
            const base = await this._loadAsset('quote.jpg');
            const avatar = await this._loadImage(avatar0);
            const canvas = createCanvas(1500, 300);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 1500, 300);
            ctx.save();
            ctx.beginPath();
            ctx.arc(90, 150, 75, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(avatar, 15, 75, 150, 150);
            ctx.restore();
            ctx.font = "60px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(username0, 230, 70);
            const now = new Date();
            const time = `Today at ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
            ctx.font = "40px Arial";
            ctx.fillStyle = "#7d7d7d";
            ctx.fillText(time, 230 + ctx.measureText(username0).width + 20, 90);
            ctx.font = "55px Arial";
            ctx.fillStyle = "#a0a0a0";
            const lines = this._wrapText(ctx, text, 1150, 55);
            lines.forEach((line, i) => {
                ctx.fillText(line, 230, 150 + (i * 65));
            });
            const resizedCanvas = createCanvas(500, 100);
            const resizedCtx = resizedCanvas.getContext("2d");
            resizedCtx.drawImage(canvas, 0, 0, 500, 100);
            return resizedCanvas.toBuffer("image/png");
        } catch (error) {
            throw new Error(`Failed to generate quote meme: ${error.message}`);
        }
    }

    async yomomma() {
        try {
            const jokes = [
                "Yo momma so fat when she walked past the TV I missed three episodes",
                "Yo momma so stupid she stuck a battery up her ass and said I GOT THE POWER",
                "Yo momma so dumb when y'all were driving to Disneyland she saw a sign that said Disneyland left so she went home",
                "Yo momma so fat she needs cheat codes for Wii Fit",
                "Yo momma so fat when she went to KFC and they asked her what size of bucket she said The one on the roof",
                "Yo momma so fat I took a picture of her last Christmas and it's still printing",
                "Yo momma so fat and old when God said Let there be light he asked your momma to step out of the way",
                "Yo momma so fat when she stepped out in a yellow jacket people yell TAXI",
                "Yo momma so fat I tried driving around her and I ran out of gas",
                "Yo momma so fat it took Thanos two snaps to kill her",
                "Yo momma so fat she sued Nintendo for guessing her weight",
                "Yo momma so dumb she tripped over WiFi",
                "Yo momma so fat she has two watches one for each timezone",
                "Yo momma so fat she left the house in high heels and came back in flip flops",
                "Yo momma so fat her blood type is Nutella",
                "Yo momma so fat she uses Google Earth to take a selfie",
                "Yo momma so fat even Dora could not explore her",
                "Yo momma so fat she jumped in the air and got stuck",
                "Yo momma so fat that when we were born she gave the hospital stretch marks",
                "Yo momma so fat she wears a sock on each toe",
                "Yo momma so fat the army uses her underwear as parachutes",
                "Yo momma so fat her patronus is a cake",
                "Yo momma so fat when she tripped over on 4th Ave she landed on 12th",
                "Yo momma so fat the only way she burns calories is when her food is on fire",
                "Yo momma so fat she won all 75 Hunger Games",
                "Yo momma so fat when she steps on a scale it says One at a time please",
                "Yo momma so fat she got her own area code",
                "Yo momma so fat even Kirby cant eat her",
                "Yo momma so fat when she went to the beach Greenpeace threw her into the ocean",
                "Yo momma so fat a vampire bit her and got Type 2 diabetes",
                "Yo momma so fat she uses butter for her chapstick",
                "Yo momma so fat when she walks backwards she beeps",
                "Yo momma so fat she puts mayo on her diet pills"
            ];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            return { text: randomJoke };
        } catch (error) {
            throw new Error(`Failed to generate yomomma joke: ${error.message}`);
        }
    }
}

module.exports = Meme;