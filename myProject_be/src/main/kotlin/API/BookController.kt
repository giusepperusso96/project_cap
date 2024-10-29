package API

import jakarta.enterprise.context.ApplicationScoped
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import main.entities.Booking

@ApplicationScoped
@Path("/book")
class BookController {

    @POST
    fun createBooking(booking: Booking) {

    }

}