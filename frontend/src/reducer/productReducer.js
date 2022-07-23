"use-strict"
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
     CLEAR_CASE,
    } from "../constants/productConstant"

export const productReducer = (state = {product:[]} , action) =>{
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:    
        return {
            loading:true,
            products:[]
        }

        case ALL_PRODUCT_SUCCESS:    
        return {
            loading:false,
            products:action.payload.product,
            productCount:action.product.productPerPage
        }
       case ALL_PRODUCT_FAIL:    
        return {
            loading:true,
            erorr:action.payload

        } 
       case CLEAR_CASE:    
        return {
            ...state,
            erorr:action.payload

        } 
    
        default:
        return state
            
    }

}
