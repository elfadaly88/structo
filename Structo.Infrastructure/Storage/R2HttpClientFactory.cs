using Amazon.Runtime;
using System.Net.Http;

namespace Structo.Infrastructure.Storage;

public class R2HttpClientFactory(HttpClient client) : HttpClientFactory
{
    public override HttpClient CreateHttpClient(IClientConfig clientConfig)
    {
        return client;
    }

    public override bool DisposeHttpClientsAfterUse(IClientConfig clientConfig)
    {
        return false;
    }

    public override bool UseSDKHttpClientCaching(IClientConfig clientConfig)
    {
        return false;
    }
}
