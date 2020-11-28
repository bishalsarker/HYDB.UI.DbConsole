import { environment } from 'src/environments/environment';

export class ApiEndpoints {
    public static readonly ROOT: string = environment.constants.api_root;

    public static readonly AUTH: string = `${ApiEndpoints.ROOT}/auth`;
    public static readonly TOKEN_GET: string = `${ApiEndpoints.AUTH}/token/get`;
    public static readonly TOKEN_VERIFY: string = `${ApiEndpoints.AUTH}/token/verify`;

    public static readonly DATA_MODELS: string = `${ApiEndpoints.ROOT}/datamodel`;
    public static readonly DATA_MODELS_ADD_NEW: string = `${ApiEndpoints.DATA_MODELS}/addnew`;
    public static readonly DATA_MODELS_GET_ALL_OR_SINGLE: string = `${ApiEndpoints.DATA_MODELS}/get`;
    public static readonly DATA_MODEL_PROPERTIES: string = `${ApiEndpoints.ROOT}/datamodel/property`;
    public static readonly DATA_MODEL_PROPERTIES_ADD_NEW: string = `${ApiEndpoints.DATA_MODEL_PROPERTIES}/addnew`;
    
}