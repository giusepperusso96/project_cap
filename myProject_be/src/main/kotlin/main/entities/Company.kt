package main.entities

import org.bson.codecs.pojo.annotations.BsonId
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId

data class Company (
 @BsonId var id : ObjectId? = ObjectId(),
 @BsonProperty("companyName") var companyName: String? = null,
 @BsonProperty("location") var location: String? = null,
 @BsonProperty("geoPosition") var geoPosition: String? = null,
 @BsonProperty("rowsNumber") var rowsNumber: Int?= 0,
 @BsonProperty("umbrellaPerRow") var umbrellasPerRow: Int? = 0,
 @BsonProperty("prices") var prices: List<Price> = emptyList(),
 @BsonProperty("availableUmbrellas") var availableUmbrellas: MutableMap<String,List<Int>>? = mutableMapOf(),
 @BsonProperty("defaultPrice") var defaultPrice: Double? = null


)
{

    init {
        if (id == null) {
            id= ObjectId()
        }
    }
}