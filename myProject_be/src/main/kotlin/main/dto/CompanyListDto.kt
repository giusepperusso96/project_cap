package main.dto

import org.bson.types.ObjectId

data class CompanyListDto(
    var list: MutableList<CompanyShortDto> = mutableListOf()
)

data class CompanyShortDto(
    var id : String?,
    var companyName : String?
)
