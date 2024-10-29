package main.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import org.bson.codecs.pojo.annotations.BsonProperty
import org.bson.types.ObjectId

data class User (
    @BsonProperty("id") @JsonIgnore var id: ObjectId? = ObjectId(),
    @JsonProperty("userId") var userId: String? = "",
    @BsonProperty("name") var name: String? = null,
    @BsonProperty("surname") var surname: String? = null,
    @BsonProperty("email") var email: String? = null,
    @BsonProperty("password") var password: String? = null,

    )
{
    init {
        this.userId = id.toString()
    }
}
