package main.entities

import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId
import java.time.LocalDate

class Booking (
    @BsonId var id : ObjectId = ObjectId(),
    @BsonProperty("companyId") var companyId: String? = null,
    @BsonProperty("company") var company : Company? = null,
    @BsonProperty("date") var date : LocalDate? = null,
    @BsonProperty("row") var row : Int? = null,
    @BsonProperty("number") var number : Int? = null,
    @BsonProperty("realNumber") var realNumber : Int? = null,
    @BsonProperty("email") var email : String? = null,

    )