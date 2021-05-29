import React, { useRef, useState, useMemo, useEffect } from "react";

import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import * as five from "../lib/container.jpg";
import { Stake, UnStake, isStaking } from "../functions/stake";

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [2, 2, 2] : [1.5, 1.5, 1.5]}
      onClick={(e) => setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" transparent side={THREE.DoubleSide}>
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
};

const Party = (props) => {
  const { accounts, handleChange, value } = props;

  const handleStake = (e) => {
    e.preventDefault();
    Stake(accounts, value);
  };
  const handleUnStake = (props) => {
    UnStake(accounts, value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    isStaking(accounts);
  });
  console.log(isStaking);
  return (
    <div>
      <img src="./images/container.jpg" alt="container" />
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" value={value} onChange={handleChange} />
        </div>

        <div>
          <button className="btn" onClick={handleStake}>
            Stake
          </button>
          <button className="btn" onClick={handleUnStake}>
            UnStake
          </button>
        </div>
      </form>
    </div>
  );
};

export default Party;
