package main.dto

import main.entities.Price

data class CompanyDto(
    val companyName: String? = null,
    val location: String? = null,
    val geoPosition: String? = null,
    val rowsNumber: Int?= 0,
    val umbrellasPerRow: Int? = 0,
    val prices: List<Price> = emptyList(),
    val availableUmbrellas: MutableMap<String,List<Int>>? = mutableMapOf(),
    val defaultPrice: Double? = null
)


