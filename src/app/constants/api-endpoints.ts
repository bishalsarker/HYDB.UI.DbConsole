import { environment } from 'src/environments/environment';

export class ApiEndpoints {
    public static readonly ROOT: string = environment.constants.api_root;
    public static readonly AUTH: string = `${ApiEndpoints.ROOT}/auth`;
    public static readonly TOKEN_GET: string = `${ApiEndpoints.AUTH}/token/get`;
    public static readonly TOKEN_VERIFY: string = `${ApiEndpoints.AUTH}/token/verify`;
}