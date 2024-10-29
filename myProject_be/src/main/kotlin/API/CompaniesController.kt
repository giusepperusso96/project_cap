package API

import com.mongodb.client.result.InsertOneResult
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam
import main.dto.CompanyDto
import main.dto.CompanyListDto
import main.entities.Company
import mongo.MongoShores
import org.bson.Document

@ApplicationScoped
@Path("/companies")
class CompaniesController(
    @Inject
    var mongoService: MongoShores
) {
    @Path("/byName")
    @GET
    fun getCompanyByName(@QueryParam("name") name: String?): Uni<MutableList<Company>>? {
        return mongoService.getCompanyByName(name);
    }
    @POST
    fun saveCompany(company: CompanyDto): Uni<InsertOneResult>? {
        return mongoService.saveCompany(company)
    }
    @GET
    @Path("/all")
    fun getAllCompany(): Uni<CompanyListDto> {
        return mongoService.getAllCompany();
    }
    @GET
    fun getCompanyById(@QueryParam("id") id: String): Uni<Company>? {
        return mongoService.getCompanyById(id)
    }

}