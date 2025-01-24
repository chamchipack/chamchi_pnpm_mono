export const KakaoType = `
    type KakaoInintialCheckReturnType {
        status: Int
        isAuthenticated: Boolean
    }

    type KakaoInfoReturnType {
        _id: ID
        social_id: String
        name: String
        provider: String
    }

    type KakaoLoginReturnType {
        status: Int
        message: String
        data: KakaoInfoReturnType
    }

    input kakaoInitialCheckType {
        provider: String!
        social_id: String!
    }

    input kakaoLoginType {
        provider: String!
        social_id: String!
        name: String!
        profile_image: String
        refresh_token: String!
        refresh_expires_at: String!
    }
`;

export const types = `
    ${KakaoType}
`;

export const query = `
`;

export const mutation = `
    """
    카카오 소셜 로그인 진입용 쿼리입니다.
    """    
    kakaoLogin(input: kakaoLoginType): KakaoLoginReturnType

    """
    카카오 소셜로그인 어플 시작시 아이디 체크용 쿼리입니다.
    """
    kakaoInitialCheck(input: kakaoInitialCheckType): KakaoInintialCheckReturnType
`;
