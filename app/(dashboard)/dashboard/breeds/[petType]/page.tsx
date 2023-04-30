import { getBreedsByPetType } from '@breed/breed-service';
import { PetType } from '@shared/domain/pet-type';

const BreedsByPetTypePage = async ({
  params,
}: {
  params: { petType: PetType };
}) => {
  const breeds = await getBreedsByPetType(params.petType);

  return <h1>{`Breeds by pet type ${JSON.stringify(params)}`}</h1>;
};

export default BreedsByPetTypePage;
