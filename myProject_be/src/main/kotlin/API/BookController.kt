package API

import com.mongodb.client.result.InsertOneResult
import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.QueryParam
import main.entities.Booking
import mongo.BookingService

@ApplicationScoped
@Path("/book")
class BookController(
    @Inject
    var bookingService: BookingService
) {

    @POST
    fun createBooking(booking: Booking): Uni<InsertOneResult>? {
        return bookingService.createBooking(booking)
    }

    @GET
    @Path("/emails")
    fun getAllEmails() : Uni<MutableSet<String?>>? =
        bookingService.getAllEmails()

    @GET
    fun getBookingsByEmail(@QueryParam("email") email:String?) : Multi<Booking>? =
        bookingService.getBookingsByemail(email)

}