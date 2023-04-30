import { Breed } from '@breed/domain/breed';
import { fetcher } from '@shared/application/fetcher';
import { PetType } from '@shared/domain/pet-type';
import { PaginationResult } from '@shared/domain/pagination-result';

export const getBreedsByPetType = async (petType: PetType) => {
  const breeds = await fetcher<PaginationResult<Breed>>(
    `${process.env.NEXT_PUBLIC_API_URL}/breeds/${petType}`,
    {
      method: 'GET',
      cache: 'force-cache',
      next: { revalidate: 10 },
    }
  );

  return breeds;
};
