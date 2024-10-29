package API

import MongoService
import com.mongodb.client.result.InsertOneResult
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import org.bson.Document

@ApplicationScoped
@Path("/documents")
class MongoController(
    @Inject
    var mongoService : MongoService

) {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getAllDocuments() : List<Document> = mongoService.getAllDocuments();

    @POST
    fun insertOneDocument( @QueryParam("name") name: String): InsertOneResult {
        val document : Document;
        document = Document("name", name);
        return mongoService.insertOneDocument(document);
    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    fun getDocumentByName(@QueryParam("name") name: String): Document? {
        return mongoService.findDocumentByName(name)
    }

    @Path("/getById")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun getDocumentById(@QueryParam("id") id: String): Document? {
        return mongoService.getById(id);
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    fun deleteDocumentByName(@QueryParam("name") name: String) {
        return mongoService.deleteDocument(Document("name", name));
    }
}