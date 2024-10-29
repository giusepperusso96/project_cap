package mongo

import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import io.quarkus.mongodb.reactive.ReactiveMongoClient
import io.quarkus.mongodb.reactive.ReactiveMongoCollection
import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni

import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import main.entities.Company
import main.entities.User
import org.bson.types.ObjectId
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class MongoUsers(
    @Inject
    var mongoClient: ReactiveMongoClient,

    @ConfigProperty(name = "mongodb.collections.users")
    var collectionName: String
) {
    private lateinit var collection: ReactiveMongoCollection<User>

    init {
        val database = mongoClient.getDatabase("myDb")
        collection = database.getCollection(collectionName, User::class.java)
    }

    fun insertNewUser(user:User): Uni<InsertOneResult>? =
        collection.insertOne(user)

    fun getUserById(id : String): Uni<User>? =
        collection.find( eq("_id", ObjectId(id)) ).collect().first()

    fun getAllUsers():  Multi<User>? =
        collection.find()
}