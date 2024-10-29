import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.bson.Document
import org.bson.types.ObjectId
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class MongoService(
    @Inject
     var mongoClient: MongoClient,

    @ConfigProperty(name="myproject.mongodb.collectionName")
    var collectionName: String
) {



    private fun getCollection() : MongoCollection<Document> =
        mongoClient.getDatabase("myDb").getCollection(collectionName)

    fun getAllDocuments(): List<Document> {
        val collection=getCollection()
        return collection.find().toList() // Converte i documenti in una lista
    }

    fun insertOneDocument(document: Document): InsertOneResult {
        val collection=getCollection()
        return collection.insertOne(document);
    }
    fun findDocumentByName( name: String): Document? {
        val collection=getCollection()
        val documnents = collection.find(eq("name", name)).toList()
        return documnents.getOrNull(0);
    }

    fun deleteDocument(document: Document) {
        val collection = getCollection()
        collection.deleteOne(eq("name", document.get("name")))
    }

    fun getById(idString: String): Document? {
        val collection = getCollection()
        val id = ObjectId(idString)
        return collection.find(eq("_id", id)).toList().firstOrNull()
    }

}