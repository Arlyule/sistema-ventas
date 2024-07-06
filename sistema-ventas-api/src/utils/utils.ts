import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import bycrypt from 'bcryptjs'

/*
*  @name Utils
*  @autor: Julio Samuel
* 
*/

class Utils {

    /**
     * @name  generateJWT
     * @description Metodo para generar un token OAUTH
     * @param payload 
     * @returns String
     */
    public generateJWT(payload: any): string {
        var token = jwt.sign(payload, keys.secret.jwt, { expiresIn: '1h' });
        return token;
    }

    /**
     * @name  getPayload
     * @description Obtener la imformacion del jwt
     * @param token 
     * @returns Object
     */
    public getPayload(token: string): any {
        var payload = <any>jwt.verify(token, keys.secret.jwt);
        const { iat, exp, ...data } = payload;
        return data;
    }

    /**
     * @name  hashPassword
     * @description Encriptar cadena de texto
     * @param password 
     * @returns Promise<string>
     */
    public async hashPassword(password: string): Promise<string> {
        const sait = bycrypt.genSaltSync(10);
        return await bycrypt.hashSync(password, sait)
    }

    /**
     * @name  checkPassword
     * @description Encriptar cadena de texto
     * @param password 
     * @returns Promise<any>
     */
    public async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bycrypt.compareSync(password, encryptedPassword);
    }

}

export const utils = new Utils();