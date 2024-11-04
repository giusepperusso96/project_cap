package mongo

import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Projections
import com.mongodb.client.result.InsertOneResult
import com.mongodb.internal.client.model.FindOptions
import io.quarkus.mongodb.reactive.ReactiveMongoClient
import io.quarkus.mongodb.reactive.ReactiveMongoCollection
import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import main.entities.Booking
import main.entities.Company
import org.bson.Document
import org.bson.types.ObjectId
import org.eclipse.microprofile.config.inject.ConfigProperty
import java.time.LocalDate

@ApplicationScoped
class BookingService(

    @Inject
    var mongoClient: ReactiveMongoClient,

    @ConfigProperty(name="mongodb.collections.booking")
    var collectionName: String
)  {
    private lateinit var collection: ReactiveMongoCollection<Booking>

    init {
        val database = mongoClient.getDatabase("myDb")
        collection = database.getCollection(collectionName, Booking::class.java)
    }

    fun createBooking(booking: Booking) : Uni<InsertOneResult>? {
        return  mongoClient.getDatabase("myDb")
            .getCollection("shores", Company::class.java)
            .find(eq("_id", ObjectId(booking.companyId)))
            .toUni().invoke{company -> booking.company = company.copy(); booking.company!!.availableUmbrellas= mutableMapOf(); booking.date= LocalDate.now() }.chain {
                -> collection.insertOne(booking)
            }
    }

    fun getBookingsByCompanyId(companyId : String){
        collection.find(eq("companyId", companyId))
    }

    fun getBookingsByemail(email : String?): Multi<Booking>? {
        return collection.find(eq("email", email))
    }
    fun getAllEmails(): Uni<MutableSet<String?>>? {
      return collection.find().map{ it.email }.collect().asSet()
    }

    fun getFavoriteShoreForUser(userId: String, dateFrom: LocalDate, dateTo: LocalDate): Uni<String?>? {
        return collection.find(eq("userId", userId)).collect().asList().map {
            var map : MutableMap<String?,Int?> = mutableMapOf();
            it.map {
                if(it.date?.compareTo(dateFrom)!! > 0 && it.date?.compareTo(dateTo)!! <= 0){
                    if(map[it.companyId]  != null)
                        map[it.companyId] = map[it.companyId]!! + 1
                    else
                        map[it.companyId] = 1
                }

            }
                map
        }.map {
            var count = 0;
            var bestCompany: String? = "";
            for((key,value) in it){
                if (value!! > count){
                    count = value
                    bestCompany = key;
                }

        }
            bestCompany;
        }
    }
    fun deleteBookingByUserShoreAndTime(userId: String, date: LocalDate, shoreId: String) : Uni<Boolean>? {
        return collection.find(eq("userId", userId))
            .filter { booking -> booking.date == date && booking.companyId == shoreId }
            .collect().first()
            .flatMap { booking ->
                collection.deleteOne(eq("_id", booking.id))
                    .map { deleteResult -> deleteResult.deletedCount > 0 }
            }
            .onFailure().recoverWithItem(false)
    }
}