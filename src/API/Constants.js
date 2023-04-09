//API Base URL
// export const API_URL = 'http://34.236.149.254/api/mobile/api/';
export const API_URL = 'http://34.236.149.254/api/mobile/api/'
export const IMAGES_URL = 'http://34.236.149.254/src/uploads/images/'

//API Content Types
export const ContentTypes = {
    None: '',
    Raw: 'application/json',
    MultipartFormData: 'multipart/form-data',
    XUrlEncodedFormData: 'application/x-www-form-urlencoded'
}

//API End Points
export const Endpoints = {
    AuthProfile: {
        Login: 'login',
        Signup: 'signup',
        Profile: 'getLoginUserProfile',
        ChangePassword: 'changePassword',
        UpdatePhoneNumber: 'updatePhoneNumber',
        UpdateAccountDetail: 'updateAccountDetail',
        UpdateLocation: 'updateLocation',
        VerifyOTP: 'verifyOTP',
        DeleteAccount: 'deleteAccount',
        ForgotPassword: 'forgotPassword',
        CheckEmail: 'checkEmail',
        ResendVerifyOTP: 'resendVerifyOTP',
        ListOfAllCompanies: 'listOfCompanies',
        ListOfAllServices: 'getAllServices',
    },
    Dashboard: {
        ContactUs: 'contactUs',
        DashboardData: 'contractorDashboard',

        Projects: {
            ActiveProjects: 'listOfActiveContractorProjects',
            AvailableProjects: 'listOfAvailableContractorProjects',
            CompletedProjects: 'listOfCompletedContractorProjects',
            UpdateProjectStatus: 'changeProjectRequestStatus',
            ProjectDetails: 'orderDetail',
            ScheduleProjectsForStaff: 'listOfScheduledContractorProjects'
        },

        Staff: 'listOfStaff',
        UpdateStaff: 'updateStaff',
        ChangeProjectOrderStatus: 'changeProjectOrderStatus',
        AssignProjectToUser: 'assignProjectToUser',
        Notifications: 'listOfNotifications',
        TransactionsList: 'listofTransactions',

        StatusBitsList: 'getUserAllStatusBit',
        StatusBitsUpdate: 'updateUserStatusBit',
    }
}
