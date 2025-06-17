package notify.microservices.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;



@Configuration
public class DynamoDbConfig {

    @Bean
    public DynamoDbClient dynamoDbClient() {
        return DynamoDbClient.builder()
                .region(Region.US_EAST_2) // o la región que estés usando
                .credentialsProvider(
                        StaticCredentialsProvider.create(
                                AwsBasicCredentials.create(
                                        "TU_ACCESS_KEY", 
                                        "TU_SECRET_KEY"
                                )
                        )
                )
                // Solo si trabajas en local (para test con DynamoDB Local o en endpoint de AWS):
                //.endpointOverride(URI.create("https://dynamodb.us-east-2.amazonaws.com"))
                .build();
    }
}
