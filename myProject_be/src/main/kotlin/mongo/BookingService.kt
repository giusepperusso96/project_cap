package mongo

import com.mongodb.client.model.Filters.eq
import com.mongodb.client.result.InsertOneResult
import io.quarkus.mongodb.reactive.ReactiveMongoClient
import io.quarkus.mongodb.reactive.ReactiveMongoCollection
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import main.entities.Booking
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

    fun createBooking(booking: Booking) : Uni<InsertOneResult>? =
        collection.insertOne(booking);


    fun getBookingsByCompanyId(companyId : String){
        collection.find(eq("companyId", companyId))
    }

    fun getBookingsByUserId(userId : String){
        collection.find(eq("userId", userId))
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
}