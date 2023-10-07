import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { ApiBearerAuth,ApiResponse ,ApiHeader,ApiTags} from '@nestjs/swagger';

@Controller('product')
@ApiTags("Products")
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}  

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({status:403,description:"forbidden"})
  @ApiResponse({
    status:21,description:"crated",
    type:CreateProductDto
  })
  @ApiHeader({
    name:"Authurazition",
    description:"send Token"
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
