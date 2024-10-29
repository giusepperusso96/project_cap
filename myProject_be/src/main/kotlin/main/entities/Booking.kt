package main.entities

import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId
import java.time.LocalDate

class Booking (
    @BsonProperty("id") var id : ObjectId = ObjectId(),
    @BsonProperty("userId") var userId: String? = null,
    @BsonProperty("companyId") var companyId : String? = null,
    @BsonProperty("date") var date : LocalDate? = null,
    @BsonProperty("row") var row : Int? = null,
    @BsonProperty("number") var number : Int? = null,
){

}