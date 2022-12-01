import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { GetUser } from '~/common/decorators';
import { BadRequestDto, UnauthorizedRequestDto } from '~/common/dto';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
  ProductQueryDTO,
  ProductResponseDTO
} from '~/products/dto';
import { ProductsService } from '~/products/products.service';

@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiCreatedResponse({ type: CreateProductResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @Post()
  async createProduct(@Body() body: CreateProductRequestDTO, @GetUser() user) {
    const { company } = user;
    const response = await this.productService.createProduct({
      companyId: company.id,
      data: {
        reference: body.reference,
        name: body.name,
        status: body.status,
        brand: body.brand,
        price: body.price,
        stock: body.stock,
        type: body.type,
        categoryId: body.categoryId
      }
    });

    return CreateProductResponseDTO.factory(response);
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedRequestDto })
  @Get()
  async getAllEmployee(@GetUser() user, @Query() params: ProductQueryDTO) {
    const { company } = user;
    const { limit: limitLines = 10, page: currentPage = 1 } = params;

    const { totalPages, page, products, results } =
      await this.productService.getAllProducts({
        companyId: company.id,
        skip: currentPage,
        take: limitLines
      });

    return ProductResponseDTO.factory({
      data: products,
      currentPage: page,
      totalPages,
      results
    });
  }
}
