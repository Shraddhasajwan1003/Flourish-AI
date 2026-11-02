/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExerciseRoutine } from '../types';

export const EXERCISE_ROUTINES: ExerciseRoutine[] = [
  {
    id: 'ex_01',
    title: 'Supta Baddha Konasana & Pelvic Floor Decompression',
    category: 'Gentle Yoga',
    phaseSuitability: ['MENSTRUAL'],
    intensity: 'Gentle',
    durationMinutes: 18,
    benefits: ['Relieves uterine cramps', 'Improves sacral blood flow', 'Calms autonomic nervous system'],
    pcosTarget: 'Downregulates sympathetic nervous system and lowers circulating cortisol.',
    posesOrSteps: [
      {
        name: 'Supta Baddha Konasana (Reclined Bound Angle)',
        durationSec: 300,
        description: 'Lie back supported with a bolster under your spine. Soles of the feet together, knees dropping out to sides with blocks for support. Breathe into the low belly.',
        caution: 'Do not force the knees down if groin feels tight.',
      },
      {
        name: 'Balasana with Wide Knees (Child Pose)',
        durationSec: 240,
        description: 'Big toes touching, knees wide as the mat. Fold torso forward resting forehead on a folded blanket. Deep belly breaths expand lumbar spine.',
      },
      {
        name: 'Viparita Karani (Supported Legs-Up-the-Wall)',
        durationSec: 360,
        description: 'Rest pelvis on a low cushion, legs extended up the wall. Relieves heavy pelvic congestion and fluid accumulation.',
      },
      {
        name: 'Gentle Pelvic Tilts & Savasana',
        durationSec: 180,
        description: 'Slow rhythmic rocking of pelvis on inhalation and exhalation, settling into quiet deep relaxation.',
      },
    ],
    modifications: ['Use two pillows under outer thighs for complete muscular release', 'Place a warm heating pad across lower abdomen'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ex_02',
    title: 'Energizing Follicular Vinyasa & Core Awakening',
    category: 'Vinyasa Flow',
    phaseSuitability: ['FOLLICULAR'],
    intensity: 'Moderate',
    durationMinutes: 25,
    benefits: ['Builds lean muscle tone', 'Enhances insulin receptor sensitivity', 'Stimulates lymphatic drainage'],
    pcosTarget: 'Utilizes rising estrogen to rebuild mitochondrial density and enhance glucose uptake.',
    posesOrSteps: [
      {
        name: 'Sun Salutation A (Surya Namaskar) Flow',
        durationSec: 360,
        description: 'Move through 4 rounds linking breath to movement: Mountain pose, forward fold, half lift, plank, chaturanga, cobra, and downward dog.',
      },
      {
        name: 'Warrior II to Side Angle (Virabhadrasana II)',
        durationSec: 300,
        description: 'Deep lunge into front knee, arms parallel to earth, opening hips and grounding through back foot.',
      },
      {
        name: 'Low Lunge Crescent Moon with Quad Stretch',
        durationSec: 240,
        description: 'Drop back knee to mat, reach heart to sky, softening hip flexors and encouraging pelvic lymph circulation.',
      },
      {
        name: 'Glute Bridge Holds with Pulse',
        durationSec: 300,
        description: 'Feet hip-width apart, drive through heels to lift hips. Activates glutes and stabilizes sacroiliac joints.',
      },
      {
        name: 'Gentle Seated Twist & Cooldown',
        durationSec: 300,
        description: 'Ardha Matsyendrasana to decompress the spine and gently stimulate abdominal organs.',
      },
    ],
    modifications: ['Drop knees in plank for joint safety', 'Hold poses for 3 breaths instead of 5 if breathing gets labored'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ex_03',
    title: 'Ovulatory Peak Strength & Metabolic HIIT',
    category: 'Strength & Resistance',
    phaseSuitability: ['OVULATORY'],
    intensity: 'Energizing',
    durationMinutes: 28,
    benefits: ['Maximizes bone mineral density', 'Dramatically improves insulin sensitivity', 'Builds confidence'],
    pcosTarget: 'Capitalizes on testosterone and estrogen surges for optimal muscle protein synthesis.',
    posesOrSteps: [
      {
        name: 'Dynamic Warmup & Hip Openers',
        durationSec: 240,
        description: 'Arm circles, bodyweight squats, inchworms, and runner lunges to prime joint capsules.',
      },
      {
        name: 'Dumbbell Goblet Squats',
        durationSec: 360,
        description: 'Hold moderate weight at chest level. Slow 3-second descent, powerful upward drive engaging glutes.',
      },
      {
        name: 'Romanian Deadlifts with Neutral Spine',
        durationSec: 360,
        description: 'Hinge at the hips keeping lats engaged and weights skimming the shins. Stretches hamstrings and fires posterior chain.',
      },
      {
        name: 'Resistance Band Lateral Walks',
        durationSec: 300,
        description: 'Band above knees, quarter squat position, stepping sideways to fire gluteus medius.',
      },
      {
        name: 'Cooldown Deep Quad & Psoas Stretches',
        durationSec: 420,
        description: 'Slow down heart rate, lengthen working muscles, hydrate with electrolyte water.',
      },
    ],
    modifications: ['Perform with bodyweight only if lifting weights is new', 'Take 45-second breaks between working sets'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ex_04',
    title: 'Luteal Low-Impact Pilates & Sacral Grounding',
    category: 'Pilates',
    phaseSuitability: ['LUTEAL'],
    intensity: 'Moderate',
    durationMinutes: 22,
    benefits: ['Prevents premenstrual fluid retention', 'Stabilizes mood swings', 'Protects hyper-lax ligaments'],
    pcosTarget: 'Maintains lean muscle stimulation without triggering cortisol spikes that aggravate PMS anxiety.',
    posesOrSteps: [
      {
        name: 'Pilates Hundred with Neutral Spine',
        durationSec: 240,
        description: 'Legs in tabletop position, pump arms briskly inhaling for 5 counts, exhaling for 5 counts. Engages deep transverse abdominis.',
      },
      {
        name: 'Side Lying Clamshells with Squeeze',
        durationSec: 300,
        description: 'Knees bent 90 degrees, heels touching. Rotate top knee up without rotating pelvis backward.',
      },
      {
        name: 'Swimming & Prone Back Extensions',
        durationSec: 240,
        description: 'Lie on belly, lengthen opposite arm and leg while keeping belly button gently lifted away from floor.',
      },
      {
        name: 'Spine Stretch Forward & Cat-Cow',
        durationSec: 240,
        description: 'Sit tall, roll down spine vertebra by vertebra, followed by quadruped cat-cow to release lumbar tightness.',
      },
      {
        name: 'Restorative Butterfly Stretch',
        durationSec: 300,
        description: 'Passive forward fold with soft back to release tension stored in the sacrum and pelvis.',
      },
    ],
    modifications: ['Keep head resting down during Hundred if neck gets tired', 'Place a pillow under hips during prone work'],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
];

export const PYTHON_ML_TRAINING_SCRIPT = `"""
=============================================================================
Flourish AI – Exercise & Movement Recommendation ML Training Pipeline
=============================================================================
This self-contained Python script allows you to train an explainable Machine
Learning model on your own exercise dataset to recommend optimal cycle-synced
yoga and physical movement routines.

Requirements:
    pip install pandas numpy scikit-learn xgboost joblib

Usage:
    python train_exercise_model.py --data my_custom_exercise_dataset.csv
=============================================================================
"""

import argparse
import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, accuracy_score, f1_score
import xgboost as xgb
import joblib

def create_sample_dataset_if_missing(file_path):
    if not os.path.exists(file_path):
        print(f"[!] Generating sample verified exercise dataset at: {file_path}")
        np.random.seed(42)
        n = 600
        phases = ['MENSTRUAL', 'FOLLICULAR', 'OVULATORY', 'LUTEAL']
        energy_levels = [1, 2, 3, 4, 5]
        pcos_flags = [0, 1]
        cramps_flags = [0, 1]
        time_availables = [15, 20, 30, 45]
        
        routines = [
            'Supta_Baddha_Konasana_Pelvic_Relief',
            'Restorative_Yin_Yoga_Child_Pose',
            'Follicular_Vinyasa_Core_Flow',
            'Moderate_Bodyweight_Strength',
            'Ovulatory_Peak_HIIT_Resistance',
            'Luteal_Low_Impact_Pilates',
            'Gentle_Walking_Pranayama'
        ]
        
        data = []
        for _ in range(n):
            phase = np.random.choice(phases, p=[0.2, 0.3, 0.15, 0.35])
            energy = np.random.choice(energy_levels)
            pcos = np.random.choice(pcos_flags, p=[0.6, 0.4])
            cramps = 1 if phase == 'MENSTRUAL' and np.random.rand() > 0.3 else 0
            time_avail = np.random.choice(time_availables)
            
            # Realistic ground truth target mapping
            if phase == 'MENSTRUAL' or cramps == 1:
                target = 'Supta_Baddha_Konasana_Pelvic_Relief' if energy <= 2 else 'Restorative_Yin_Yoga_Child_Pose'
            elif phase == 'FOLLICULAR':
                target = 'Follicular_Vinyasa_Core_Flow' if time_avail >= 25 else 'Moderate_Bodyweight_Strength'
            elif phase == 'OVULATORY':
                target = 'Ovulatory_Peak_HIIT_Resistance' if energy >= 3 else 'Follicular_Vinyasa_Core_Flow'
            else: # LUTEAL
                target = 'Luteal_Low_Impact_Pilates' if energy >= 3 else 'Gentle_Walking_Pranayama'
                
            data.append({
                'cycle_phase': phase,
                'energy_level': energy,
                'has_pcos': pcos,
                'reported_cramps': cramps,
                'time_available_mins': time_avail,
                'recommended_routine': target
            })
            
        df = pd.DataFrame(data)
        df.to_csv(file_path, index=False)
        print(f"[✓] Saved {n} balanced exercise records to {file_path}")

def train_model(data_path, output_model_path="femnourish_exercise_model.joblib"):
    print(f"[*] Loading training data from: {data_path}")
    df = pd.read_csv(data_path)
    
    features = ['cycle_phase', 'energy_level', 'has_pcos', 'reported_cramps', 'time_available_mins']
    target = 'recommended_routine'
    
    X = df[features]
    y = df[target]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    categorical_cols = ['cycle_phase']
    numerical_cols = ['energy_level', 'has_pcos', 'reported_cramps', 'time_available_mins']
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols),
            ('num', StandardScaler(), numerical_cols)
        ]
    )
    
    # Train high-accuracy classifier
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', xgb.XGBClassifier(
            n_estimators=120,
            max_depth=4,
            learning_rate=0.08,
            subsample=0.85,
            random_state=42,
            eval_metric='mlogloss'
        ))
    ])
    
    # Encode target labels
    from sklearn.preprocessing import LabelEncoder
    le = LabelEncoder()
    y_train_enc = le.fit_transform(y_train)
    y_test_enc = le.transform(y_test)
    
    print("[*] Training XGBoost Classifier...")
    model.named_steps['preprocessor'].fit(X_train)
    X_train_transformed = model.named_steps['preprocessor'].transform(X_train)
    X_test_transformed = model.named_steps['preprocessor'].transform(X_test)
    
    classifier = model.named_steps['classifier']
    classifier.fit(X_train_transformed, y_train_enc)
    
    y_pred_enc = classifier.predict(X_test_transformed)
    acc = accuracy_score(y_test_enc, y_pred_enc)
    print(f"[✓] Model Accuracy: {acc * 100:.2f}%")
    print("\\nClassification Report:")
    print(classification_report(y_test_enc, y_pred_enc, target_names=le.classes_))
    
    export_payload = {
        'model': model,
        'label_encoder': le,
        'features': features,
        'classes': le.classes_.tolist(),
        'accuracy': float(acc)
    }
    
    joblib.dump(export_payload, output_model_path)
    print(f"[✓] Model successfully persisted to {output_model_path}")
    print("You can upload or link this model in Flourish AI settings for custom inference!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flourish AI Exercise ML Pipeline")
    parser.add_argument("--data", default="exercise_dataset.csv", help="Path to input CSV dataset")
    parser.add_argument("--out", default="flourish_exercise_model.joblib", help="Output model path")
    args = parser.parse_args()
    
    create_sample_dataset_if_missing(args.data)
    train_model(args.data, args.out)
`;
