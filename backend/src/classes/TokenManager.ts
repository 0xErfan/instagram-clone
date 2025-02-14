import { Buffer } from 'buffer';
import crypto from 'crypto';

class TokenManager {

    private readonly key: Buffer;
    private readonly algorithm = 'aes-256-gcm';

    constructor() {

        const secretKey = process.env?.secretKey
        console.log(secretKey, 'fuck you buddy')
        if (!secretKey) throw new Error('Secret key is required')

        this.key = crypto.scryptSync(secretKey, 'salt', 32);

    }

    async encryptToken(data: unknown): Promise<string> {

        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', 'asljwfealaefl;selfaj', iv);

        const payload = JSON.stringify(data);

        let encrypted = cipher.update(payload, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const tag = cipher.getAuthTag();

        return Buffer.concat([iv, tag, Buffer.from(encrypted, 'hex')]).toString('base64url');

    }

    async decryptToken(token: string): Promise<unknown> {

        try {

            const data = Buffer.from(token, 'base64url');
            const iv = data.subarray(0, 12);
            const tag = data.subarray(12, 28);
            const encrypted = data.slice(28);

            const decipher = crypto.createDecipheriv('aes-256-gcm', 'asljwfealaefl;selfaj', iv);
            decipher.setAuthTag(tag);

            const decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8') + decipher.final('utf8');

            return JSON.parse(decrypted);
            
        } catch (error: any) {
            throw new Error(`Failed to decrypt token: ${error.message}`);
        }
    }
}

export default TokenManager;