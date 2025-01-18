export const KakaoStartType = `
    type KakaoStartReturnType {
        result: Boolean!
    }
`;

export const types = `
    ${KakaoStartType}
`;

export const query = `
`;

export const mutation = `
    """
    카카오 소셜 로그인 진입용 쿼리입니다.
    """    
    getStartKakaoLogin: KakaoStartReturnType
`;
