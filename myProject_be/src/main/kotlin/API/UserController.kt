package API

import MongoService
import com.mongodb.client.result.InsertOneResult
import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.PathParam
import jakarta.ws.rs.QueryParam
import main.entities.User
import mongo.MongoUsers


@ApplicationScoped
@Path("/user")
class UserController(

    @Inject
    var mongoService: MongoUsers
) {

    @GET
    @Path("/{id}")
    fun getUserById(@PathParam("id") id: String): Uni<User>? {
        return mongoService.getUserById(id)
    }

    @POST
    fun insertUser(user: User): Uni<InsertOneResult>? {
        return mongoService.insertNewUser(user)
    }

    @GET
    fun getAllUsers(): Multi<User>? {
        return mongoService.getAllUsers()
    }

}