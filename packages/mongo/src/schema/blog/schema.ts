/**
 * @description 블로그 조회용 타입
 * input: 인풋용
 * type : 리턴값
 */

export const Article = `
    type ArticleType = {
        _id: ID
        imageId: String
        markdown_contents: String
        title: String
        summary: String
        tag: [String]
        theme: String
        created: String
        updated: String
        userId: String
        userName: String
        thumbnail: String
        isPublic: Boolean
    }

    input ArticleListSearchInput {
        title: String
        tag: [String]
    }
`;

export const query = `
    """
    Or 조건으로 블로그 글을 검색함
    """
    getArticleListOrType (input: ArticleListSearchInput, offset: Int, limit: Int): [ArticleType]
`;

// {
//     "category": "react-native",
//     "collectionId": "nm9mvpr0s795yky",
//     "collectionName": "library",
//     "created": "2025-01-18 11:37:57.924Z",
//     "id": "e0p3o1tncmuj9kj",
//     "imageId": "",
//     "log": 0,
//     "markdown_contents": "## 카카오\r\n\r\n### Delegate.m 설정\r\n\r\nAppDelegate 파일에서 Kakao Login을 처리하기 위해 openURL 메서드에 Kakao 관련 처리를 추가해야 합니다. Kakao Login SDK에서 제공하는 메서드를 활용하여 로그인 URL을 처리합니다:\r\n\r\n```\r\n#import <RNKakaoLogins.h>\r\n// kakao\r\n\r\n\r\n@implementation AppDelegate\r\n\r\n- (BOOL)application:(UIApplication *)app\r\n     openURL:(NSURL *)url\r\n     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {\r\n if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {\r\n    return [RNKakaoLogins handleOpenUrl: url];\r\n }\r\n return NO;\r\n}\r\n```\r\n\r\n위 코드는 Kakao SDK에서 제공하는 URL 처리를 AppDelegate에 추가하여 Kakao Login 요청을 처리하도록 설정합니다.\r\n\r\n### Info.plist\r\n```\r\n<key>KAKAO_APP_KEY</key>\r\n<string>{keykeykeykey}</string>\r\n<key>LSApplicationQueriesSchemes</key>\r\n<array>\r\n<string>kakao{keykeykeykey}</string>\r\n<string>kakaolink</string>\r\n<string>kakaokompassauth</string>\r\n</array>\r\n```\r\n\r\n- KAKAO_APP_KEY: Kakao Developers에서 발급받은 앱 키.\r\n\r\n- LSApplicationQueriesSchemes: Kakao SDK에서 사용하는 URL 스킴을 명시하여 iOS 앱의 보안 설정과 통신 가능성을 보장.\r\n\r\n### 토큰 흐름\r\n\r\n액세스와 리프레시를 카카오로부터 받고 액세스는 키체인으로, 리프레시는 서버에 둔다. 로그인 후 서비스를 이용한다\r\n\r\n근데 액세스토큰으로 서비스에서 뭔가 할 일이 있을까? 사실상의 유저 편의성을 위한 로그인 서비스 측면성이 강한데.\r\n\r\n&nbsp;\r\n\r\n리프레시도 2개월마다 갱신이 필요한데, (물론 서버에서 해버리면 되지만) 굳이 그렇게 해야 할 필요가 있을까? 토큰으로 통신을 하는것도 아닌데? 서비스 제작자의 의도에 따라 다른걸까?\r\n\r\n&nbsp;\r\n\r\n### 서비스 제작자의 의도에 따른 설계 방향\r\n\r\n카카오 로그인과 토큰 관리는 서비스 설계 의도에 따라 달라질 수 있을건데\r\n\r\n- 단순 인증용: 사용자 로그인 상태만 유지한다면, 액세스 토큰만으로 충분하며, 리프레시 토큰 관리 필요성이 낮아질 수 있다.\r\n\r\n- 카카오 API 적극 활용: 사용자 프로필 조회, 소셜 기능, 메시지 전송 등 카카오의 다양한 기능을 활용한다면 액세스 토큰과 리프레시 토큰의 철저한 관리가 필수적일것이다.",
//     "markdown_title": "소셜로그인 참고점",
//     "summary": "카카오\r\n\r\nDelegate.m 설정\r\n\r\nAppDelegate 파일에서 Kakao Login을 처리하기 위해 openURL 메서드에 Kakao 관련 처리를 추가해야 합니다. Kakao ...",
//     "tag": "[]",
//     "theme": "study",
//     "thumbnail": "",
//     "timestamp": "2025-01-25 12:21:09",
//     "updated": "2025-01-25 03:21:10.062Z",
//     "userId": "시스템관리자",
//     "userName": "시스템관리자"
//   }
