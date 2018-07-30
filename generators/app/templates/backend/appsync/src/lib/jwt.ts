import * as jwt from "jsonwebtoken";

export function createJWT(sub: string, jti: string, now: Date, expireIn: number) {
    const iat = Math.floor(now.getTime() / 1000);
    const exp = iat + expireIn;

    const payload = {
        exp,
        iat,
        iss: process.env.JWT_ISS || "<%= appname %>",
        jti,
        sub,
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "");
}
