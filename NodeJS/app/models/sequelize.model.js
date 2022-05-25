module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {

    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING
    },
    personal_email: {
      type: Sequelize.STRING
    },
    school_email: {
      type: Sequelize.STRING
    },
    discord_id: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING
    },
    organisation: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    reason_joining: {
      type: Sequelize.STRING
    },
    join_referral: {
      type: Sequelize.STRING
    },
    mailing_list: {
      type: Sequelize.INTEGER
    },
    indemnity_submitted: {
      type: Sequelize.INTEGER
    },
    indemnity_verified: {
      type: Sequelize.INTEGER
    },
    create_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    },
    profile_img: {
      type: Sequelize.STRING
    },
    use_bio: {
      type: Sequelize.STRING
    },
    last_logged_in: {
      type: Sequelize.DATE
    },

  }, { timestamps: false });

  const user_tracks = sequelize.define("user_tracks", {
    usertracks_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    create_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    }
  }, { timestamps: false });

  const tracks = sequelize.define("tracks", {
    tracks_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    track_name: {
      type: Sequelize.STRING
    },
    track_description: {
      type: Sequelize.STRING
    },
    track_provider: {
      type: Sequelize.STRING
    },
    track_link: {
      type: Sequelize.STRING
    },
    track_lemons: {
      type: Sequelize.INTEGER
    },
    create_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    }

  }, { timestamps: false });

  const tracktags = sequelize.define("tracktags", {
    tracktag_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tracktag_name: {
      type: Sequelize.STRING
    }
  }, { timestamps: false });

  const junction_tracktags = sequelize.define("junction_trackstags");

  const badges = sequelize.define("badges", {
    badge_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    badge_name: {
      type: Sequelize.STRING
    },
    badge_description: {
      type: Sequelize.STRING
    },
    badge_pillar: {
      type: Sequelize.STRING,
      allowNull: true
    },
    badge_vine: {
      type: Sequelize.STRING,
      allownull: true
    },
    vine_level: {
      type: Sequelize.INTEGER
    },
    badge_grapes: {
      type: Sequelize.INTEGER
    },
    total_playgrounds: {
      type: Sequelize.INTEGER
    },
    badge_etc: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    }
  }, { timestamps: false });


  const user_badges = sequelize.define("user_badges", {
    userbadges_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: Sequelize.STRING,
    },
    completed_playgrounds: {
      type: Sequelize.INTEGER,
    },
    completed_at: {
      type: Sequelize.DATE
    },
    created_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    },
  }, { timestamps: false });

  const badge_vines = sequelize.define("badge_vines", {
    vine_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vine_id: {
      type: Sequelize.STRING,
    },
    vine_description: {
      type: Sequelize.STRING,
    },
    total_badges: {
      type: Sequelize.INTEGER,
    },
    bg_colour: {
      type: Sequelize.INTEGER
    },
    vine_colour: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    },
  }, { timestamps: false });

  const playgrounds = sequelize.define("playgrounds", {
    playground_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    playground_title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    playground_description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    playground_etc: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    }
  }, { timestamps: false });

  const user_playgrounds = sequelize.define("user_playgrounds", {
    userpg_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true
    },
    progress: {
      type: Sequelize.INTEGER
    },
    created_at: {
      type: Sequelize.DATE
    },
    modified_at: {
      type: Sequelize.DATE
    }
  }, { timestamps: false });

  user.belongsToMany(tracks, { through: user_tracks, foreignKey: "username" });
  tracks.belongsToMany(user, { through: user_tracks, foreignKey: "track_id" });
  tracks.belongsToMany(tracktags, { through: junction_tracktags, foreignKey: "track_name" });
  tracktags.belongsToMany(tracks, { through: junction_tracktags, foreignKey: "track_tag" });
  tracktags.hasMany(tracks, { foreignKey: "track_tags" });
  user.belongsToMany(badges, { through: user_badges, foreignKey: "username" });
  badges.belongsToMany(user, { through: user_badges, foreignKey: "badge_id" });
  badge_vines.hasMany(badges, { foreignKey: "bage_vine" });
  user.belongsToMany(badges, { through: user_playgrounds, foreignKey: "username" });
  badges.belongsToMany(user, { through: user_playgrounds, foreignKey: "badge_id" });
  badges.hasMany(playgrounds, {foreignKey: "badge_id"})

  return user;
};

//test 1st commit