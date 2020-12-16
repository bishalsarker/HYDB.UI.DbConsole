import { environment } from 'src/environments/environment';

export class ApiEndpoints {
    public static readonly ROOT: string = environment.constants.api_root;

    // Auth
    public static readonly AUTH: string = `${ApiEndpoints.ROOT}/auth`;
    public static readonly TOKEN_GET: string = `${ApiEndpoints.AUTH}/token/get`;
    public static readonly TOKEN_VERIFY: string = `${ApiEndpoints.AUTH}/token/verify`;

    //Data Model
    public static readonly DATA_MODELS: string = `${ApiEndpoints.ROOT}/datamodel`;
    public static readonly DATA_MODELS_ADD_NEW: string = `${ApiEndpoints.DATA_MODELS}/addnew`;
    public static readonly DATA_MODELS_UPDATE: string = `${ApiEndpoints.DATA_MODELS}/update`;
    public static readonly DATA_MODELS_GET_ALL_OR_SINGLE: string = `${ApiEndpoints.DATA_MODELS}/get`;
    public static readonly DATA_MODELS_REMOVE: string = `${ApiEndpoints.DATA_MODELS}/delete`;

    public static readonly DATA_MODEL_PROPERTIES: string = `${ApiEndpoints.DATA_MODELS}/property`;
    public static readonly DATA_MODEL_PROPERTIES_ADD_NEW: string = `${ApiEndpoints.DATA_MODEL_PROPERTIES}/addnew`;
    public static readonly DATA_MODEL_PROPERTIES_UPDATE: string = `${ApiEndpoints.DATA_MODEL_PROPERTIES}/update`;
    public static readonly DATA_MODEL_PROPERTIES_REMOVE: string = `${ApiEndpoints.DATA_MODEL_PROPERTIES}/delete`;

    //Services
    public static readonly SERVICES_ROOT: string = `${ApiEndpoints.ROOT}/dataservice`;
    public static readonly SERVICES_ADD_NEW: string = `${ApiEndpoints.SERVICES_ROOT}/addnew`;
    public static readonly SERVICES_UPDATE: string = `${ApiEndpoints.SERVICES_ROOT}/update`;
    public static readonly SERVICES_GET_ALL_OR_SINGLE: string = `${ApiEndpoints.SERVICES_ROOT}/get`;
    public static readonly SERVICES_REMOVE: string = `${ApiEndpoints.SERVICES_ROOT}/delete`;

    public static readonly SERVICES_OPERATIONS: string = `${ApiEndpoints.SERVICES_ROOT}/operation`;
    public static readonly SERVICES_OPERATIONS_ADD_NEW: string = `${ApiEndpoints.SERVICES_OPERATIONS}/addnew`;
    public static readonly SERVICES_OPERATIONS_UPDATE: string = `${ApiEndpoints.SERVICES_OPERATIONS}/update`;
    public static readonly SERVICES_OPERATIONS_REMOVE: string = `${ApiEndpoints.SERVICES_OPERATIONS}/delete`;
    public static readonly SERVICES_OPERATIONS_GET_ALL_OR_SINGLE: string = `${ApiEndpoints.SERVICES_OPERATIONS}/get`;
    public static readonly SERVICES_OPERATIONS_UPDATE_SCRIPTS: string = `${ApiEndpoints.SERVICES_OPERATIONS}/updatescript`;
    
}