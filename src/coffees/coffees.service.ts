import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Café Três Corações',
      brand: 'Três corações',
      flavors: ['chocalate', 'expresso', 'capuccino'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((item) => item.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`);
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
    return createCoffeeDto;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffe = this.findOne(id);

    if (existingCoffe) {
      //update the existing entity
      const updateCoffe = Object.assign(existingCoffe, updateCoffeeDto);
      return updateCoffe;
    }
  }

  delete(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) this.coffees.splice(coffeeIndex, 1);
  }
}
