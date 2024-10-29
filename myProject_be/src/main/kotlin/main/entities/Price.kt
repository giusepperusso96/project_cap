package main.entities


import org.bson.codecs.pojo.annotations.BsonProperty

data class Price (
    @BsonProperty("rowFrom") var rowFrom: Int? = null,
    @BsonProperty("rowTo") var rowTo: Int? = null,
    @BsonProperty("price") var price: Double? = null
)