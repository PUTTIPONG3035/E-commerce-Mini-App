using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Net.Http.Headers;
using System.Net;
using System.Web.Http.Results;

public class CustomAuthenticationFilter : AuthorizeAttribute, IAuthorizationFilter
{
    public async Task AuthenticationAsync(HttpAuthenticationContext context, CancellationToken cancellationToken){
        HttpRequestMessage request = context.Request;
        AuthenticationHeaderValue authorization = request.Headers.Authorization;
        if(authorization == null || authorization.Scheme != "Bearer" || string.IsNullOrEmpty(authorization.Parameter)){
            context.ErrorResult = new AuthenticationFailureResult();
            return ;
        }
        context.Principal = TokenManager.GetPrincipal(authorization.Parameter);
    }

    public async Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken){
       var result = await context.Result.ExecuteAsync(cancellationToken);
       if(result.StatusCode == HttpStatusCode.Unauthorized){
           result.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Basic", "real=localhost"));
       }
       context.Result = new ResponseMessageResult(result);
    }
}

public class AuthenticationFailureResult : IHttpActionResult{
    public AuthenticationFailureResult(){}

    public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken){
        HttpResponseMessage responseMessage = new HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
        return Task.FromResult(responseMessage);
    }
}