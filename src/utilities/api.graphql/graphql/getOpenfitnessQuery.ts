export const getOpenfitnessQuery = `
query OpenfitnessDashboard {
    exercise {
      id
      created_at
      name
      reps
      sets
      date
      time
      muscle
      difficulty
      equipment
      instructions
      type
      user_id
      weight
    }
    food {
      id
      created_at
      name
      # calories
      date
      time
      nutrients
      user_id
      meal
      num_servings
      serving_size
    }
    profile {
      id
      created_at
      age
      height
      weight
      goal
      exercise
      user_id
    }
    sleep {
      id
      created_at
      startDate
      endDate
      value
      duration
    }
    steps {
      id
      created_at
      value
      startDate
      endDate
      duration
      type
    }
    weight {
      id
      created_at
      weight
      date
      user_id
      time
    }
  }
`;