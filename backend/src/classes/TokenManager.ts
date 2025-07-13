import { Buffer } from 'buffer';
import crypto, { CipherGCM, DecipherGCM } from 'crypto';

const TokenManager = () => {

    const secretKey = process.env?.secretKey
    if (!secretKey) throw new Error('Secret key is required')

    let algorithm = 'aes-256-gcm'
    let key = crypto.scryptSync(secretKey, 'salt', 32);

    return {

        encryptToken: async (data: unknown): Promise<string> => {

            const iv = crypto.randomBytes(12);
            const cipher = crypto.createCipheriv(algorithm, key, iv) as CipherGCM;

            const payload = JSON.stringify(data);

            let encrypted = cipher.update(payload, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            const tag = cipher.getAuthTag();

            return Buffer.concat([iv, tag, Buffer.from(encrypted, 'hex')]).toString('base64url');

        },

        decryptToken: async (token: string): Promise<unknown> => {

            try {

                const data = Buffer.from(token, 'base64url');
                const iv = data.subarray(0, 12);
                const tag = data.subarray(12, 28);
                const encrypted = data.slice(28);

                const decipher = crypto.createDecipheriv(algorithm, key, iv) as DecipherGCM;
                decipher.setAuthTag(tag);

                const decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8') + decipher.final('utf8');

                return JSON.parse(decrypted);

            } catch (error: any) {
                throw new Error(`Failed to decrypt token: ${error.message}`);
            }
        }

    }

}

export default TokenManager;