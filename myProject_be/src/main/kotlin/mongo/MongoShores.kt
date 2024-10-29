package mongo

import com.fasterxml.jackson.databind.ObjectMapper
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import io.quarkus.mongodb.reactive.ReactiveMongoClient
import io.quarkus.mongodb.reactive.ReactiveMongoCollection
import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import main.dto.CompanyDto
import main.dto.CompanyListDto
import main.dto.CompanyShortDto
import main.entities.Company
import org.bson.Document
import org.bson.types.ObjectId
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class MongoShores(

    @Inject
    var mongoClient: ReactiveMongoClient,
    @Inject
    var objectMapper: ObjectMapper,

    @ConfigProperty(name="under_umbrella.mongodb.collectionName")
    var collectionName: String
) {

    private lateinit var collection: ReactiveMongoCollection<Company>

    init {
        val database = mongoClient.getDatabase("myDb")
        collection = database.getCollection(collectionName, Company::class.java)
    }


    fun getCompanyByName(companyName: String?) : Uni<MutableList<Company>>? {
        if (companyName != null) {
           return  collection.find(eq("companyName", companyName)).collect().asList()
        } else {
           return  collection.find().collect().asList().onItem().invoke {it -> println(objectMapper.writeValueAsString(it))};
        }

    }

    fun saveCompany(company: CompanyDto): Uni<InsertOneResult>? {
        for(i in 1..company.rowsNumber!!){
            company.availableUmbrellas!![""+i]=(1..company.umbrellasPerRow!!).toList()
        }
        val companyToSave = objectMapper.convertValue(company, Company::class.java)
        return collection.insertOne(companyToSave);
    }

    fun getAllCompany(): Uni<CompanyListDto> {
        return collection.find()
            .collect().asList()
            .map { companies ->
                val companyList = CompanyListDto()
                companyList.list = companies.map {
                    CompanyShortDto(id = it.id.toString(), companyName = it.companyName)
                }.toMutableList()
                companyList
            }
    }
    fun getCompanyById(companyId: String): Uni<Company>? {
        return collection.find(eq("_id",ObjectId(companyId))).toUni()
    }
}

